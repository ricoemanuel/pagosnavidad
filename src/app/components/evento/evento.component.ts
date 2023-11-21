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
  codigo:string=""
  @ViewChild('template') template!: TemplateRef<any>;
  tiempoInactividad = 300000;
  ultimoTiempoInteraccion: number;
  listaCodigos:any={"HalloMañanitas":0.1,"HallowWhatsapp":0.3}

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
      this.ultimoTiempoInteraccion = Date.now();
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:keypress', ['$event'])
  manejarInteraccion(event: Event): void {
    // Actualiza el tiempo de la última interacción
    this.ultimoTiempoInteraccion = Date.now();
  }
  verificarInactividad(): void {
    console.log(this.ultimoTiempoInteraccion)
    const tiempoActual = Date.now();
    const tiempoInactivo = tiempoActual - this.ultimoTiempoInteraccion;

    // Comprueba si ha pasado el tiempo de inactividad
    if (tiempoInactivo > this.tiempoInactividad) {
      if(this.id){
        this.firebase.valirdarAsientos(this.id,this.user)
      }
      
    }
  }
  async seleccionar() {
    await this.router.navigate(['evento', this.select])
    window.location.reload()
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
    this.verificarInactividad()
    setInterval(() => this.verificarInactividad(), 60000);
  }
  dataUser:any
  detalle: any = {}
  valirdarAsientos() {
    this.firebase.getAuthState().subscribe(async res => {
      if (res && this.id) {
        this.user = res.uid
        this.dataUser=await this.firebase.getUser(this.user)
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
    let detalle=[...[this.detalle]]
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

      this.modalService.hide()
      let asientos: string = '';
      let suma = 0
      this.listaAsientos.forEach((asiento: any) => {
        let zona = this.evento.zonas.filter((zona: any) => {
          return zona.nombreZona === asiento.nombreZona
        })
        zona = zona[0]
        if(!zona.persona){
          if(zona.nombreZona==="zona B"){
            zona.persona=75000
          }
          if(zona.nombreZona==="zona A"){
            zona.persona=90000
          }
        }
        suma += zona.precioZona + (this.detalle[asiento.label].personas * zona.persona)
        asientos += `${asiento.nombreZona} ${this.evento.labels[asiento.fila]}-${asiento.label}, `
      })
      asientos = asientos.slice(0, -2)
      let descuento=this.listaCodigos[this.codigo]
      let mensaje=""
      if(descuento){
        suma=suma-(suma*descuento)
        mensaje=`Mesas del evento ${asientos} con un descuento del ${descuento*100}% con el codigo ${this.codigo}`
      }else{
        mensaje=`Mesas del evento ${asientos}`
      }
      let response = await this.wompi.generarLink(suma, mensaje, this.evento.nombre);
      let asientosIds: string[] = []
      await this.listaAsientos.forEach(async asiento => {
        asientosIds.push(`${asiento.nombreZona},f${asiento.fila}c${asiento.columna}-${asiento.evento}/${this.evento.labels[asiento.fila]}-${asiento.label}`)
        asiento.clienteEstado = "pagando"
        asiento.estado = "ocupado"
        await this.firebase.actualizarAsiento(asiento)
      })
      response.subscribe(async (res: any) => {
        await this.firebase.registrarFactura(res.data.id, this.dataUser,this.user, this.id!, asientosIds, this.evento, detalle[0], this.codigo, suma)
        let link: string = `https://checkout.wompi.co/l/${res.data.id}`
        window.location.href=link
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
  @HostListener('window:beforeunload', ['$event'])
  doSomething($event: Event) {
    if (this.id) this.firebase.valirdarAsientos(this.id, this.user)
  }
}
