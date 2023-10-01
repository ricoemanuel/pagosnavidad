import { Component, OnInit, TemplateRef, Pipe, PipeTransform, OnDestroy, ChangeDetectorRef, AfterViewInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { WompiService } from 'src/app/services/wompi.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit, OnDestroy, AfterViewInit {
  spinner: boolean = true
  id: string | null;
  select = ""
  evento: any
  modalRef?: BsModalRef;
  listaAsientos: any[] = []
  link!: SafeUrl
  user!: string
  enabled = new FormControl(false);
  suscriptionTransaccion!: Subscription;
  asientosReservadosSus!: Subscription;
  matriz: any[] = []
  localidadesMostradas: Set<string> = new Set<string>();
  nombreLocalidadMostrado: boolean = false;
  @ViewChild('template') template!: TemplateRef<any>;
  secondFormGroup = this._formBuilder.group({
    ninos: '',
    adultos: '',
    persona: ''
  });
  constructor(private aRoute: ActivatedRoute,
    private firebase: FirebaseService,
    private modalService: BsModalService,
    private wompi: WompiService,
    protected _sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    private el: ElementRef,
    private router: Router,
    private _formBuilder: FormBuilder,) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  seleccionar() {
    this.router.navigate(['evento', this.select])
  }
  ngAfterViewInit(): void {
    this.spinner = false
  }
  ngOnDestroy(): void {
    this.valirdarAsientos()
  }
  async ngOnInit(): Promise<void> {
    if (this.id) {
      this.evento = await this.firebase.getevento(this.id)
      if (!this.evento) {
        window.location.href = 'https://myteventos.com/halloween-encantado/';
      } else {
        localStorage.setItem('id', this.id)
        for (let i = 0; i < this.evento.filas; i++) {
          let array: any[] = []
          for (let j = 0; j < this.evento.columnas; j++) {
            array.push(false)
          }
          this.matriz.push(array)
        }


        this.evento.zonas.forEach((zona: any) => {
          zona.precioZona = parseInt(zona.precioZona)
        });
        this.valirdarAsientos()
        this.getAsientos()
      }


    }
  }
  detalle: any = {}
  pagarT() {
    console.log(this.detalle)
  }
  valirdarAsientos() {
    this.firebase.getAuthState().subscribe(async res => {
      if (res && this.id) {
        this.user = res.uid
        this.asientosReservadosSus = this.firebase.getAsientoRealtimeByUsuarioEstado(res.uid, this.id).subscribe(res => {
          this.listaAsientos = res
          this.detalle = {}
          this.listaAsientos.forEach(asiento => {
            this.detalle[asiento.label] = {
              ninos: 0,
              adultos: 0,
              personas: 0
            }
          })
          if(this.listaAsientos.length>3){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Solo puedes escoger 3 mesas por transacción',
            })
          }
        })
        await this.firebase.valirdarAsientos(this.id, this.user)
      }
    })
  }
  getAsientos() {
    this.evento.zonas.forEach((zona: any) => {
      zona.arrayZonas.forEach((asiento: any) => {
        this.matriz[asiento.fila][asiento.columna] = zona
      })
    })



  }

  openModal(template: TemplateRef<any>, back: boolean) {
    if (!back) {
      this.modalRef = this.modalService.show(template);
    } else {
      this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
    }



  }
  selectedZone = ""
  mostrarZona(zona: any, template: TemplateRef<any>) {
    if (zona) {
      this.selectedZone = zona
      this.openModal(template, false)
    }

  }
  permitirCerrar: boolean = true
  async cerrarPopup(event: any) {
    if (this.id) {
      await this.firebase.valirdarAsientos(this.id, this.user)
      this.modalService.hide()
    }

  }
  async pagar(template: TemplateRef<any>) {
    let pass = true
    let claves = Object.keys(this.detalle)
    let error1:string=""
    let error2:string=""
    claves.forEach(clave => {
      let totalPersonas = 8 + this.detalle[clave].personas
      if (this.detalle[clave].adultos < 1) {
        error1+=clave+", "
        pass = false
      }
      if (!((this.detalle[clave].ninos + this.detalle[clave].adultos) === totalPersonas)) {
        error2+=`${totalPersonas} en la mesa ${clave}, `
        pass = false
      }
    })
    error2=error2.slice(0,-2)
    let mensajes=true
    if(error1!=="" && error2!==""){
      mensajes=false
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `En la(s) mesa(s) ${error1}Debe de haber al menos 1 adulto y el número de niños más el de adultos en cada mesa debe ser: ${error2}`,
      })
    }
    if(error1!=="" && mensajes){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `En la(s) mesa(s) ${error1}Debe de haber al menos 1 adulto`,
      })
    }
    if(error2!=="" && mensajes){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El número de niños más el de adultos en cada mesa debe ser: ${error2}`,
      })
    }
    if (pass) {
      console.log(pass)

      this.modalService.hide()
      let asientos: string = '';
      let suma = 0
      this.listaAsientos.forEach((asiento: any) => {
        let zona = this.evento.zonas.filter((zona: any) => {
          return zona.nombreZona === asiento.nombreZona
        })
        zona = zona[0]
        suma += zona.precioZona + (this.detalle[asiento.label].personas * zona.persona)
        asientos += `${asiento.nombreZona} ${this.evento.labels[asiento.fila]}-${asiento.label}, `
      })
      asientos = asientos.slice(0, -2)
      console.log(suma)
      let response = await this.wompi.generarLink(suma, `Palcos del evento ${asientos}`, this.evento.nombre);
      response.subscribe(async (res: any) => {
        let link: string = `https://checkout.wompi.co/l/${res.data.id}`
        this.link = this._sanitizer.bypassSecurityTrustResourceUrl(link)
        this.openModal(template, false)
        this.vigilarPago(res.data.id)
      })
    }

  }
  vigilarPago(ref: string) {
    this.suscriptionTransaccion = this.firebase.transactions().subscribe(async res => {
      let iterable = Object.entries(res);
      let array: any[] = [];

      iterable.forEach(([key, transaccion]: any) => {
        transaccion.key = key;
        array.push(transaccion);
      });



      let respuesta = array.filter(pago => {
        return pago.data.transaction.payment_link_id === ref
      })
      if (respuesta.length > 0) {

        await this.aprobarSillas(respuesta[0])
        this.modalService.hide()
        return

      }
    })
  }
  async aprobarSillas(transaccion: any) {
    this.permitirCerrar = false
    this.suscriptionTransaccion.unsubscribe()
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Validando compra, por favor espere.',
      showConfirmButton: false,
    })
    if (transaccion.data.transaction.status !== 'APPROVED') {
      let asientosIds: string[] = []
      await this.listaAsientos.forEach(async asiento => {
        asientosIds.push(`${asiento.nombreZona},f${asiento.fila}c${asiento.columna}-${asiento.evento}/${this.evento.labels[asiento.fila]}-${asiento.label}`)
        asiento.clienteEstado = "pago"
        asiento.estado = "ocupado"
        await this.firebase.actualizarAsiento(asiento)
      })
      await this.firebase.registrarFactura(transaccion, this.user, this.id!, asientosIds, this.evento, this.detalle)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Has comprado los asientos!! Muy pronto podrás visualizar el QR para ingresar al evento',
        showConfirmButton: false,
        timer: 3000
      })
      this.router.navigate(['mis-compras'])
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'La transacción no ha sido confirmada, comunícate con tu banco.',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        window.location.reload()
      })
    }



  }
  string(i: number, j: number) {
    return `${i}-${j}`
  }
  nombresMostrados: string[] = [];
  ids: string[] = []
  mostrarNombre(nombre: string, id: string, precio: number) {
    if (!this.nombresMostrados.includes(nombre)) {
      this.nombresMostrados.push(nombre);
      const elemento = document.getElementById(id);
      if (elemento) {
        elemento.innerHTML = `${nombre ? nombre : ""}${nombre ? ':' : ""} ${precio ? precio.toLocaleString('es-ES') : ""}`;
      }
    }
  }
  @HostListener('window:beforeunload', ['$event'])
  doSomething($event: Event) {
    if (this.id) this.firebase.valirdarAsientos(this.id, this.user)
  }

  continuar(template: TemplateRef<any>) {
    this.openModal(template, true)
  }
  async cancelar() {
    if (this.id) {
      // Cierra el pop-up (asegúrate de que this.modalRef.hide() sea una función asíncrona)
      this.modalRef?.hide();

      // Espera 1.5 segundos usando setTimeout
      await new Promise((resolve) => {
        setTimeout(resolve, 150);
      });

      // Luego, ejecuta la función validarAsientos
      await this.firebase.valirdarAsientos(this.id, this.user);
    }


  }
}
