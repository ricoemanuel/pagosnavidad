import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as QRCode from 'qrcode-generator';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aprobar-mesas',
  templateUrl: './aprobar-mesas.component.html',
  styleUrls: ['./aprobar-mesas.component.scss']
})
export class AprobarMesasComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<any>
  baseSeleccionada = ""
  listaAsientos: any[] = []
  detalle: any = {}
  displayedColumns: string[] = ['QR', 'Evento', 'Valor', 'Nombre', 'personas', 'transaccion', 'fecha', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  spinner!: boolean;
  conts: any = {}
  nombres: any = {}
  constructor(private firebase: FirebaseService,
    private modalService: BsModalService,
  ) {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  formatfecha(fecha: any) {

    const fechaDate = new Date(fecha.seconds * 1000 + fecha.nanoseconds / 1e6);

    // Obtener el nombre del día
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const nombreDia = diasSemana[fechaDate.getUTCDay()];

    // Obtener la fecha en formato dd/mm/aaaa
    const dia = fechaDate.getUTCDate().toString().padStart(2, '0');
    const mes = (fechaDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
    const año = fechaDate.getUTCFullYear();

    // Obtener la hora en formato hh:mm
    const hora = fechaDate.getUTCHours().toString().padStart(2, '0');
    const minutos = fechaDate.getUTCMinutes().toString().padStart(2, '0');

    const formatoDeseado = `${nombreDia}, ${dia}/${mes}/${año}`;
    return formatoDeseado


  }
  cont: number = 0
  async ngOnInit(): Promise<void> {
    this.spinner = true
   
   
    this.firebase.getAuthState().subscribe(user => {
      if (user!.uid === "NNcOSeH29sRCTw7LDqOlthXdg8E3") {
        this.firebase.getFacturas().subscribe(res => {
          let data = res.filter((factura: any) => {
            if (factura.eventoData) {
              return factura.eventoData.nombre.split(" ")[0] === "Navidad" && (factura.estado === "comprando")
            }
            return false
          })
          this.cont = 0
          data.forEach(async (factura: any) => {
            if (factura.detalle) {
              let llaves = Object.keys(factura.detalle)
              let numNiños = 0
              let numAdultos = 0
              llaves.forEach((llave: string) => {
                numNiños += parseInt(factura.detalle[llave].ninos)
                numAdultos += parseInt(factura.detalle[llave].adultos)
              })
              this.cont += factura.asientos.length
              if (this.conts[factura.evento]) {

                this.conts[factura.evento].ninos += numNiños
                this.conts[factura.evento].adultos += numAdultos
              } else {
                this.nombres[factura.evento] = factura.eventoData.nombre
                this.conts[factura.evento] = {
                  ninos: numNiños,
                  adultos: numAdultos
                }
              }
            }

          })
         this.data=data
          this.dataSource.data = data
          this.dataSource.paginator = this.paginator;
          this.validarEntradas()
        })
      }
    })

  }
  data:any
  validarEntradas() {
    console.log("entró")
    this.data.forEach(async (entrada: any) => {
      if (entrada.estado === 'comprando') {
        this.firebase.transactions().subscribe(async res => {
          let iterable = Object.entries(res);
          let array: any[] = [];

          iterable.forEach(([key, transaccion]: any) => {
            transaccion.key = key;
            array.push(transaccion);
          });
          let transaccion = array.filter((trans: any) => {
            return trans.data.transaction.payment_link_id === entrada.link
          })
          if (transaccion.length > 0) {
            if (transaccion[0].data.transaction.status === 'APPROVED') {
              entrada.estado = 'comprado'
              entrada.transaccion=transaccion[0].data.transaction
              await this.firebase.actualizarFactura(entrada, entrada.id)
              await entrada.asientos.forEach(async (asiento: string) => {
                let id = asiento.split(",")[1].split("/")[0]
                let dataAsiento: any = (await this.firebase.getAsientoByid(id)).data()
                dataAsiento.clienteEstado = 'pago'
                
                await this.firebase.actualizarAsiento(dataAsiento)

              })
            }
             if (transaccion[0].data.transaction.status === 'DECLINED') {
               entrada.estado = 'cancelado'
               await this.firebase.actualizarFactura(entrada, entrada.id)
               await entrada.asientos.forEach(async (asiento: string) => {
                 let id = asiento.split(",")[1].split("/")[0]
                 let dataAsiento: any = (await this.firebase.getAsientoByid(id)).data()
                 dataAsiento.clienteEstado = 'null'
                 dataAsiento.clienteUser = 'null'
                 dataAsiento.estado = 'libre'
                 await this.firebase.actualizarAsiento(dataAsiento)
               })
             }
          } else {
            let fechaInicio = new Date(entrada.fecha.seconds * 1000 + entrada.fecha.nanoseconds / 1e6);
            let fechaFin = new Date();
            let diferencia = ((fechaFin.getTime() - fechaInicio.getTime()) / 1000) / 60;
            if (diferencia > 30) {
              entrada.estado = 'cancelado'
              await this.firebase.actualizarFactura(entrada, entrada.id)
              await entrada.asientos.forEach(async (asiento: string) => {
                let id = asiento.split(",")[1].split("/")[0]
                let dataAsiento: any = (await this.firebase.getAsientoByid(id)).data()
                dataAsiento.clienteEstado = 'null'
                dataAsiento.clienteUser = 'null'
                dataAsiento.estado = 'libre'
                await this.firebase.actualizarAsiento(dataAsiento)

              })
            }
          }

        });

      }
    })
  }
  generateQRCodeBase64(qrData: string) {
    const qr = QRCode(0, 'L');
    qr.addData(qrData);
    qr.make();
    return qr.createDataURL(10, 0);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openQR(codigo: string, template: TemplateRef<any>) {
    this.baseSeleccionada = codigo
    this.openModal(template)
  }
  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);


  }
  formatAsientos(asientos: any[]) {
    let asientosString: string = ""
    asientos.forEach(asiento => {
      asientosString += (asiento.split("/")[1] + ', ')
    })
    return asientosString.slice(0, -2)
  }
  formatZonas(asientos: any[]) {
    let asientosString: string[] = []
    asientos.forEach(asiento => {
      asientosString.push(asiento.split(",")[0])
    })
    asientosString = asientosString.filter((item, index) => {
      return asientosString.indexOf(item) === index;
    })
    return asientosString
  }
  iterObject(elemento: any) {
    let claves = Object.keys(elemento)
    let asistentes: string = ""
    claves.forEach(clave => {
      asistentes += `<br>${clave}<br>Niños: ${elemento[clave].ninos}<br>Adultos: ${elemento[clave].adultos}<br>`
    })
    return asistentes
  }
  toArray() {
    return Object.keys(this.nombres)
  }
  ventaEdit:any
  editar(venta: any, template: TemplateRef<any>) {
    this.ventaEdit = JSON.parse(JSON.stringify(venta));
    this.detalle = JSON.parse(JSON.stringify(venta.detalle));
    let claves = Object.keys(venta.detalle);
    this.listaAsientos = claves.map((clave: string) => ({ label: clave }));
    this.openModal(template);
}
eliminar(venta:any){
  Swal.fire({
    title: "Quieres borrar esta venta?",
    showDenyButton: true,
    confirmButtonText: "Borrar",
    denyButtonText: `Cancelar`
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      venta.asientos.forEach(async(asiento:string)=>{
        let data:any=(await this.firebase.getAsientoByid(asiento.split(",")[1].split("/")[0])).data()
        data.clienteEstado="null"
        data.estado="libre"
        data.clienteUser="null"
        await this.firebase.actualizarAsiento(data)
      })
      venta.estado="borrado"
      await this.firebase.actualizarFactura(venta,venta.id)
    }
  });
}


  async guardar() {
    this.modalService.hide()
    this.ventaEdit.detalle=this.detalle
    await this.firebase.actualizarFactura(this.ventaEdit,this.ventaEdit.id)
  }
  cancelar() {
    this.modalService.hide()
    this.detalle = {}
    this.listaAsientos = []

  }
}
