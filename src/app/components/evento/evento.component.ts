import { Component, OnInit, TemplateRef, Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
export class EventoComponent implements OnInit, OnDestroy {
  id: string | null;
  evento: any
  modalRef?: BsModalRef;
  listaAsientos: any[] = []
  link!: SafeUrl
  user!: string
  suscriptionTransaccion!: Subscription;
  asientosReservadosSus!: Subscription;
  maxWidth: string = '60vw';
  constructor(private aRoute: ActivatedRoute,
    private firebase: FirebaseService,
    private modalService: BsModalService,
    private wompi: WompiService,
    protected _sanitizer: DomSanitizer) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  async ngOnInit(): Promise<void> {
    if (this.id) {
      this.evento = await this.firebase.getevento(this.id)
      this.evento.zonas.forEach((zona: any) => {
        zona.precioZona = parseInt(zona.precioZona)
      });
      this.firebase.getAuthState().subscribe(async res => {
        if (res && this.id) {
          this.user = res.uid
          this.asientosReservadosSus=this.firebase.getAsientoRealtimeByUsuarioEstado(res.uid, this.id).subscribe(res => {
            this.listaAsientos = res

          })
          this.firebase.getAsientoByUsuarioEstado(res.uid, this.id).then(res => {
            res.forEach(async (asiento: any) => {
              asiento.clienteEstado = "null"
              asiento.clienteUser = "null"
              asiento.estado = "libre"
              await this.firebase.actualizarAsiento(asiento)
            })
          })
        }
      })
    }
  }
  openModal(template: TemplateRef<any>, backdrop:boolean) {
    if(backdrop){
      this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
    }else{
      this.modalRef = this.modalService.show(template);
    }
    
  }
  selectedZone = ""
  mostrarZona(zona: any, template: TemplateRef<any>) {
    this.selectedZone = zona
    this.openModal(template,false)
  }
  async pagar(template: TemplateRef<any>) {
    Swal.fire({
      title: 'Antes de continuar por favor no actualice el sitio web antes de realizar el pago...',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.modalService.hide()
        let asientos: string = '';
        let suma = 0
        this.listaAsientos.forEach((asiento: any) => {
          let zona = this.evento.zonas.filter((zona: any) => {
            return zona.nombreZona === asiento.nombreZona
          })
          zona = zona[0]
          suma += zona.precioZona
          asientos += `${asiento.fila}-${asiento.columna}, `
        })
        asientos = asientos.slice(0, -2)
        let response = await this.wompi.generarLink(suma, asientos, this.user);
        response.subscribe(async (res: any) => {
          let link: string = `https://checkout.wompi.co/l/${res.data.id}`
          this.link = await this._sanitizer.bypassSecurityTrustResourceUrl(link)
          this.openModal(template,true)
          this.vigilarPago(res.data.id)
        })
      }
    })
  }
  vigilarPago(ref: string) {
    this.suscriptionTransaccion = this.firebase.transactions().subscribe(async res => {
      let iterable = Object.values(res)
      let array: any[] = []
      iterable.forEach(transaccion => {
        array.push(transaccion)
      })
      let respuesta = array.filter(pago => {
        return pago.data.transaction.payment_link_id === ref
      })
      if (respuesta.length > 0) {

        await this.aprobarSillas(respuesta[0].data.transaction.status)
        this.modalService.hide()
        return

      }
    })
  }
  async aprobarSillas(status: string) {
    this.suscriptionTransaccion.unsubscribe()
    if(status==='APPROVED'){
      await this.listaAsientos.forEach(async asiento => {
        asiento.clienteEstado = "pago"
        asiento.estado = "ocupado"
        await this.firebase.actualizarAsiento(asiento)
      })
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Has comprado los asientos!!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'La transacción no ha sido confirmada.',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        window.location.reload()
      })
    }
    
    

  }

}
