import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import {Observable} from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.scss']
})
export class RegistrarVentaComponent implements OnInit{
  venta=this.fb.group({
    producto: ["", Validators.required]
  });
  RetoCardmodalRef?: BsModalRef;
  listaProductos!:Observable<any[]>;
  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private modalService: BsModalService,){
  }
  ngOnInit(): void {
    
  }
  openPopup(template: TemplateRef<any>) {
    this.RetoCardmodalRef = this.modalService.show(template, {
      class: 'modal-lg'});
  }
  handleEvent(eventData: any){
    console.log(eventData)
  }
  
}
