import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent {
  createCliente: FormGroup
  submitted = false

  constructor(private fb: FormBuilder, private _clienteService: FirebaseService, private router: Router ){
    this.createCliente = this.fb.group({
      nombre:["", Validators.required],
      apellido:["", Validators.required],
      email:["", Validators.required],
      id:["", Validators.required],
      telefono:["", Validators.required],
      direccion:["", Validators.required],
      ciudad:["", Validators.required]
    })
  }

  addCliente(){
    this.submitted = true
    if (this.createCliente.invalid) {
      return
    }
    const empleado: any = {
      nombre: this.createCliente.value.nombre,
      apellido: this.createCliente.value.apellido,
      email: this.createCliente.value.email,
      id: this.createCliente.value.id,
      telefono: this.createCliente.value.telefono,
      direccion: this.createCliente.value.direccion,
      ciudad: this.createCliente.value.ciudad,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this._clienteService.addCliente(empleado).then(() => {
      console.log("Empleado registrado con éxito");
      //this.router.navigate(['/']); 
    }).catch(error => {
      console.log(error);
    });
  }
}
