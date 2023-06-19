import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss']
})
export class FormProductosComponent {
  createProductoCaracteristicas: FormGroup;
  createProductoCostos: FormGroup;
  submitted = false;
  id: string | null;
  titulo = "Registrar producto";

  constructor(
    private fb: FormBuilder,
    private _productoService: FirebaseService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createProductoCaracteristicas = this.fb.group({
      nit: ["", Validators.required],
      descripcion: ["", Validators.required]
    });

    this.createProductoCostos = this.fb.group({
      precioCompra: ["", Validators.required],
      precioVenta: ["", Validators.required]
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esProducto();
  }

  addEditarProducto() {
    this.submitted = true;

    if (this.createProductoCaracteristicas.invalid || this.createProductoCostos.invalid) {
      return;
    }

    if (this.id === null) {
      this.addProducto();
    } else {
      this.editarProducto(this.id);
    }
  }

  addProducto() {
    const producto: any = {
      nit: this.createProductoCaracteristicas.value.nit,
      descripcion: this.createProductoCaracteristicas.value.descripcion,
      precioCompra: this.createProductoCostos.value.precioCompra,
      precioVenta: this.createProductoCostos.value.precioVenta,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };

    this._productoService.addProducto(producto)
      .then(() => {
        console.log("Producto registrado con éxito");
        this.router.navigate(['/productos']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  esProducto() {
    if (this.id !== null) {
      this.titulo = "Editar producto";

      this._productoService.getProducto(this.id)
        .then(data => {
          if (data) {
            this.createProductoCaracteristicas.patchValue({
              nit: data['nit'],
              descripcion: data['descripcion']
            });

            this.createProductoCostos.patchValue({
              precioCompra: data['precioCompra'],
              precioVenta: data['precioVenta']
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  editarProducto(id: string) {
    const producto: any = {
      nit: this.createProductoCaracteristicas.value.nit,
      descripcion: this.createProductoCaracteristicas.value.descripcion,
      precioCompra: this.createProductoCostos.value.precioCompra,
      precioVenta: this.createProductoCostos.value.precioVenta,
      fechaActualizacion: new Date()
    };

    this._productoService.actualizarProducto(id, producto)
      .then(() => {
        this.router.navigate(['/productos']);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
