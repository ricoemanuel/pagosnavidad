import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-asiento-palco',
  templateUrl: './asiento-palco.component.html',
  styleUrls: ['./asiento-palco.component.scss']
})
export class AsientoPalcoComponent implements  OnInit {
  @Input() information: any;
  @Input() fila!: number;
  @Input() columna!: number;
  
  modalRef?: BsModalRef;
  formulario = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', Validators.required],
  });
  vendedor: FormControl = new FormControl('');
  map: boolean = false;
  cont1: number = 0
  firstTime: boolean = true
  user: string | undefined;
  evento: any;
  charging: boolean = true
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private asientoService: FirebaseService, private modalService: BsModalService) { }

  async ngOnInit(): Promise<void> {
    this.asientoService.getAuthState().subscribe(res => {
      this.user = res?.uid
    })
    this.route.params.subscribe(params => {
      this.evento = params['id'];
    });

    this.asientoService.getAsientoRealtime(this.fila, this.columna, this.evento).subscribe(res => {
      this.information = res[0]
      this.charging = false
    })
  }
  openModal(template: TemplateRef<any>) {
    if (this.information['estado'] != "ocupado") {
    }
    //this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });


  }
  cancelar(template: TemplateRef<any>) {
    if (this.information['estado'] != "ocupado") {
    }
    this.modalRef?.hide()
  }

  async seleccionar() {
    console.log(this.information)
    let edit=true
    if(this.user){
      if (this.information.estado !== 'reservando' && this.information.estado !== 'ocupado') {
        this.information.estado = 'reservando'
        this.information.clienteUser = this.user
        this.information.clienteEstado='sin pagar'
        await this.asientoService.actualizarAsiento(this.information);
        edit=false
      }
      if(this.user===this.information.clienteUser && this.information.estado==='reservando' && edit){
        console.log("true")
        this.information.estado = 'libre'
        this.information.clienteUser = 'null'
        this.information.clienteEstado='null'
        this.asientoService.actualizarAsiento(this.information);
      }
      
    }else{
      Swal.fire({
        title: 'Antes de continuar por favor Inicie Sesión',
        showDenyButton: false,
        confirmButtonText: 'Aceptar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login'])
        }
      })
    }
    

  }
}
