import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent {
  createCliente: FormGroup
  submitted = false
  id: string | null;
  titulo = "Registrar cliente"

  constructor(private fb: FormBuilder, private _clienteService: FirebaseService, private router: Router, private aRoute: ActivatedRoute){
    this.createCliente = this.fb.group({
      nombre:["", Validators.required],
      apellido:["", Validators.required],
      email:["", Validators.required],
      nit:["", Validators.required],
      telefono:["", Validators.required],
      cupo:["", Validators.required],
      deuda:["", Validators.required],
      direccion:["", Validators.required],
      ciudad:["", Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit():void{
    this.esCliente()
  }

  addEditarCliente(){
    this.submitted = true
    if (this.createCliente.invalid) {
      return
    }
    if (this.id === null) {
      this.addCliente()
    }else{
      this.editarCliente(this.id)
    }
  }

  addCliente(){
    const empleado: any = {
      nombre: this.createCliente.value.nombre,
      apellido: this.createCliente.value.apellido,
      email: this.createCliente.value.email,
      nit: this.createCliente.value.nit,
      telefono: this.createCliente.value.telefono,
      cupo: this.createCliente.value.cupo,
      deuda: this.createCliente.value.deuda,
      direccion: this.createCliente.value.direccion,
      ciudad: this.createCliente.value.ciudad,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this._clienteService.addCliente(empleado).then(() => {
      console.log("Empleado registrado con éxito");
      this.router.navigate(['/clientes']); 
    }).catch(error => {
      console.log(error);
    });
  }

  esCliente() {
    if (this.id !== null) {
      this.titulo = "Editar cliente"
      this._clienteService.getCliente(this.id).then(data => {
        if (data) {
          // Lógica para cargar los datos del cliente en el formulario de edición
          this.createCliente.patchValue({
            nombre: data['nombre'],
            apellido: data['apellido'],
            email: data['email'],
            nit: data['nit'],
            telefono: data['telefono'],
            cupo: data['cupo'],
            deuda: data['deuda'],
            direccion: data['direccion'],
            ciudad: data['ciudad']
          });
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }

  editarCliente(id: string){
    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      apellido: this.createCliente.value.apellido,
      email: this.createCliente.value.email,
      nit: this.createCliente.value.nit,
      telefono: this.createCliente.value.telefono,
      cupo: this.createCliente.value.cupo,
      deuda: this.createCliente.value.deuda,
      direccion: this.createCliente.value.direccion,
      ciudad: this.createCliente.value.ciudad,
      fechaActualizacion: new Date()
    }
    this._clienteService.actualizarEmpleado(id, cliente).then(()=>{
      this.router.navigate(['/clientes']); 
    }).catch(error => {
      console.log(error);
    });
  }
//   selectedFileName: string | undefined;

// onFileSelected(input: HTMLInputElement): void {
//   const file= input.files?.item(0);
//   this.selectedFileName = file?.name || '';
// }
  
}
