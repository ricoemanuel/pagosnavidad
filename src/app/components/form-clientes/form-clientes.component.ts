import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/entities/cliente';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent {
  createClientePersonal: FormGroup;
  createClienteContacto: FormGroup;
  submitted = false;
  id: string | null;
  titulo = "Registrar cliente";
  esAdmin: any
  constructor(
    private fb: FormBuilder,
    private _clienteService: FirebaseService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createClientePersonal = this.fb.group({
      nombreTercero: ["", Validators.required],
      tipoId: ["", Validators.required],
      Id: ["", Validators.required],
      digitoVerificacion: ["", Validators.required],
    });

    this.createClienteContacto = this.fb.group({
      direccion: ["", Validators.required],
      telefono: ["", Validators.required],
      ciudad: ["", Validators.required],
      nombreContacto: ["", Validators.required]
    });



    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit(): Promise<void> {
    this.esAdmin = await this._clienteService.esAdmin()
    if (this.esAdmin) {

      this.router.navigate(["/admin"])
    }
    this.esCliente();
  }

  addEditarCliente() {
    this.submitted = true;

    if (this.createClientePersonal.invalid || this.createClienteContacto.invalid) {
      return;
    }

    if (this.id === null) {
      this.addCliente();
    } else {
      this.editarCliente(this.id);
    }
  }

  async addCliente() {
    let cliente: Cliente = {
      nombreTercero: this.createClientePersonal.value.nombreTercero,
      tipoId: this.createClientePersonal.value.tipoId,
      Id: this.createClientePersonal.value.Id,
      digitoVerificacion: this.createClientePersonal.value.digitoVerificacion,
      ciudad: this.createClienteContacto.value.ciudad,
      direccion: this.createClienteContacto.value.direccion,
      nombreContacto: this.createClienteContacto.value.nombreContacto,
      telefono: this.createClienteContacto.value.telefono,
      estado: "Activo",
      empresa: await this._clienteService.getCurrentEmpresa()
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
              nombreTercero: data['nombreTercero'],
              tipoId: data['tipoId'],
              Id: data['Id'],
              digitoVerificacion: data['digitoVerificacion'],
            });

            this.createClienteContacto.patchValue({
              direccion: data['nombreTercero'],
              telefono: data['telefono'],
              ciudad: data['ciudad'],
              nombreContacto: data['nombreContacto']
            });


          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  async editarCliente(id: string) {
    const cliente: Cliente = {
      nombreTercero: this.createClientePersonal.value.nombreTercero,
      tipoId: this.createClientePersonal.value.tipoId,
      Id: this.createClientePersonal.value.Id,
      digitoVerificacion: this.createClientePersonal.value.digitoVerificacion,
      ciudad: this.createClienteContacto.value.ciudad,
      direccion: this.createClienteContacto.value.direccion,
      nombreContacto: this.createClienteContacto.value.nombreContacto,
      telefono: this.createClienteContacto.value.telefono,
      estado: "Activo",
      empresa: await this._clienteService.getCurrentEmpresa()
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

