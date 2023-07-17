import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-form-proveedores',
  templateUrl: './form-proveedores.component.html',
  styleUrls: ['./form-proveedores.component.scss']
})
export class FormProveedoresComponent implements OnInit {
  createProveedorForm: FormGroup;
  submitted = false;
  id: string | null;
  titulo = "Registrar proveedor";
  esAdmin: any;
  dataProveedor: any;

  constructor(
    private fb: FormBuilder,
    private _proveedorService: FirebaseService, // Asumo que tienes un servicio llamado "FirebaseService" para manejar los datos de proveedores.
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createProveedorForm = this.fb.group({
      codigo: ["", Validators.required],
      nombre: ["", Validators.required],
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit(): Promise<void> {
    this.esAdmin = await this._proveedorService.esAdmin();
    if (this.esAdmin) {
      this.router.navigate(['/admin']);
    }
    this.esProveedor();
  }

  addEditarProveedor() {
    this.submitted = true;

    if (this.createProveedorForm.invalid) {
      return;
    }

    if (this.id === null) {
      this.addProveedor();
    } else {
      this.editarProveedor(this.id);
    }
  }

  async addProveedor() {
    let empresa = await this._proveedorService.getCurrentEmpresa();
    const proveedor: any = {
      codigo: this.createProveedorForm.value.codigo,
      empresa: empresa,
      nombre: this.createProveedorForm.value.nombre,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    this._proveedorService.setProveedor(proveedor.codigo, proveedor)
      .then(() => {
        console.log("Proveedor registrado con éxito");
        this.router.navigate(['/proveedores']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  esProveedor() {
    if (this.id !== null) {
      this.titulo = "Editar proveedor";

      this._proveedorService.getProveedor(this.id)
        .then(data => {
          if (data) {
            this.dataProveedor = data;
            this.createProveedorForm.patchValue({
              codigo: data['codigo'],
              nombre: data['nombre'],
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  editarProveedor(id: string) {
    const proveedor: any = {
      codigo: this.dataProveedor.codigo,
      empresa: this.dataProveedor.empresa,
      nombre: this.createProveedorForm.value.nombre,
      fechaCreacion: this.dataProveedor.fechaCreacion,
      fechaActualizacion: new Date(),
    };

    this._proveedorService.setProveedor(id, proveedor)
      .then(() => {
        this.router.navigate(['/proveedores']);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
