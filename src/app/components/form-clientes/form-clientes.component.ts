import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent {
  createClientePersonal: FormGroup;
  createClienteContacto: FormGroup;
  createClienteCartera: FormGroup;
  submitted = false;
  id: string | null;
  titulo = "Registrar cliente";
  esAdmin:boolean=localStorage.getItem("esAdmin")==="true"?true:false
  constructor(
    private fb: FormBuilder,
    private _clienteService: FirebaseService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createClientePersonal = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      nit: ["", Validators.required]
    });

    this.createClienteContacto = this.fb.group({
      email: ["", Validators.required],
      telefono: ["", Validators.required],
      ciudad: ["", Validators.required],
      direccion: ["", Validators.required]
    });

    this.createClienteCartera = this.fb.group({
      cupo: ["", Validators.required],
      deuda: ["", Validators.required]
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if(this.esAdmin){
      this.router.navigate(["/admin"])
    }
    this.esCliente();
  }

  addEditarCliente() {
    this.submitted = true;

    if (this.createClientePersonal.invalid || this.createClienteContacto.invalid || this.createClienteCartera.invalid) {
      return;
    }

    if (this.id === null) {
      this.addCliente();
    } else {
      this.editarCliente(this.id);
    }
  }

  addCliente() {
    const cliente: any = {
      nombre: this.createClientePersonal.value.nombre,
      apellido: this.createClientePersonal.value.apellido,
      email: this.createClienteContacto.value.email,
      nit: this.createClientePersonal.value.nit,
      telefono: this.createClienteContacto.value.telefono,
      cupo: this.createClienteCartera.value.cupo,
      deuda: this.createClienteCartera.value.deuda,
      direccion: this.createClienteContacto.value.direccion,
      ciudad: this.createClienteContacto.value.ciudad,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };

    this._clienteService.addCliente(cliente)
      .then(() => {
        console.log("Cliente registrado con éxito");
        this.router.navigate(['/clientes']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  esCliente() {
    if (this.id !== null) {
      this.titulo = "Editar cliente";

      this._clienteService.getCliente(this.id)
        .then(data => {
          if (data) {
            this.createClientePersonal.patchValue({
              nombre: data['nombre'],
              apellido: data['apellido'],
              nit: data['nit']
            });

            this.createClienteContacto.patchValue({
              email: data['email'],
              telefono: data['telefono'],
              ciudad: data['ciudad'],
              direccion: data['direccion']
            });

            this.createClienteCartera.patchValue({
              cupo: data['cupo'],
              deuda: data['deuda']
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  editarCliente(id: string) {
    const cliente: any = {
      nombre: this.createClientePersonal.value.nombre,
      apellido: this.createClientePersonal.value.apellido,
      email: this.createClienteContacto.value.email,
      nit: this.createClientePersonal.value.nit,
      telefono: this.createClienteContacto.value.telefono,
      cupo: this.createClienteCartera.value.cupo,
      deuda: this.createClienteCartera.value.deuda,
      direccion: this.createClienteContacto.value.direccion,
      ciudad: this.createClienteContacto.value.ciudad,
      fechaActualizacion: new Date()
    };

    this._clienteService.actualizarEmpleado(id, cliente)
      .then(() => {
        this.router.navigate(['/clientes']);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

