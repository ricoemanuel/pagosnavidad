import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as QRCode from 'qrcode-generator';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { interval } from 'rxjs';
@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.scss']
})
export class MisComprasComponent implements OnInit {
  data: any[] = []
  baseSeleccionada = ""
  displayedColumns: string[] = ['QR', 'Evento', 'Valor', 'asientos', 'zonas', 'personas'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('content', { static: false }) content!: ElementRef;
  constructor(private firebase: FirebaseService, private modalService: BsModalService, private router: Router) {

  }

  async ngOnInit(): Promise<void> {
    this.firebase.getAuthState().subscribe(user => {
      this.firebase.getCurrentFacturas(user!.uid).subscribe(res => {
        res = res.filter((factura: any) => {
          if (factura.eventoData) {
            return factura.estado !== 'cancelado'
          } else {
            return false
          }
        })
        this.data = res
        this.validarEntradas()
        // // Ejecutar validarEntradas cada 10 segundos
        // const intervalo = interval(10000); // 10000 milisegundos = 10 segundos
        // const subscription = intervalo.subscribe(() => {
        //   this.validarEntradas();
        // });
      })
    })
  }
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
            if (transaccion[0].data.transaction.status !== 'APPROVED') {
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
            // if (transaccion[0].data.transaction.status === 'DECLINED') {
            //   entrada.estado = 'cancelado'
            //   await this.firebase.actualizarFactura(entrada, entrada.id)
            //   await entrada.asientos.forEach(async (asiento: string) => {
            //     let id = asiento.split(",")[1].split("/")[0]
            //     let dataAsiento: any = (await this.firebase.getAsientoByid(id)).data()
            //     dataAsiento.clienteEstado = 'null'
            //     dataAsiento.clienteUser = 'null'
            //     dataAsiento.estado = 'libre'
            //     await this.firebase.actualizarAsiento(dataAsiento)
            //   })
            // }
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
  generarPDF(id: string) {
    const content = document.getElementById(id); // Reemplaza 'pdfContent' con el ID de tu elemento HTML

    if (content) {
      const contentWidth = content.offsetWidth;
      const contentHeight = content.offsetHeight;
      const reduccion = 0.25;
      const pdfWidth = contentWidth * reduccion;
      const pdfHeight = contentHeight * reduccion;

      html2canvas(content).then((canvas) => {
        const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`halloween-${id}`);
      });
    } else {
      console.error('No se encontró el elemento con el ID especificado.');
    }
  }

  generateQRCodeBase64(qrData: string) {
    const qr = QRCode(0, 'L');
    qr.addData(qrData);
    qr.make();
    return qr.createDataURL(10, 0);
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
      asistentes += `<div class="col-md-4">${clave}<br>Niños: ${elemento[clave].ninos}<br>Adultos: ${elemento[clave].adultos}</div>`
    })
    return asistentes
  }
}
