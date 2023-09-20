import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-asiento-palco',
  templateUrl: './asiento-palco.component.html',
  styleUrls: ['./asiento-palco.component.scss']
})
export class AsientoPalcoComponent implements AfterViewInit, OnInit {
  information$: Observable<any> | undefined;
  modalRef?: BsModalRef;
  @Output() seleccionarAsiento = new EventEmitter<any>();
  @Input() zonaSeleccionada!: string
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
  constructor(private router: Router, private formBuilder: FormBuilder, private asientoService: FirebaseService, private modalService: BsModalService) { }

  async ngOnInit(): Promise<void> {
    this.asientoService.getAuthState().subscribe(res => {
      this.user = res?.uid
    })
    if (localStorage.getItem("mapa") == "true") {
      this.map = true;
    }

    if (this.information) {
      if (this.information['nombreZona'] === this.zonaSeleccionada) {
        let cont2 = parseInt(localStorage.getItem(this.information['nombreZona']) ?? '0');
        cont2++
        if (this.firstTime) {
          this.firstTime = false
          this.cont1 = cont2
        }
        localStorage.setItem(this.information['nombreZona'], cont2.toString());

      } else {
        this.information.estado = 'noSelected'
      }
    }
  }

  async ngAfterViewInit(): Promise<void> {

  }

  @Input() information: any;


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
  Reservar() {
    this.information.cliente = this.formulario.value
    this.information.vendedor = this.vendedor.value
    this.asientoService.actualizarAsiento(this.information);
    this.modalRef?.hide();
  }

  seleccionar() {
    if (this.information.estado !== 'reservando' && this.information.estado !== 'ocupado') {
      this.information.estado = 'reservando'
      this.information.clienteUser = this.user
      this.information.clienteEstado='sin pagar'
      this.asientoService.actualizarAsiento(this.information);
      this.seleccionarAsiento.emit(this.information)
    }

  }
}
