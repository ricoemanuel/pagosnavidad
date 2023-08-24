import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/entities/producto';
import { FirebaseService } from 'src/app/services/firebase.service';
import { JsonFormatterService } from 'src/app/services/json-formatter.service';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss']
})
export class FormProductosComponent implements OnInit {
  createProductoCaracteristicas: FormGroup;
  datosInventario: FormGroup;
  datosAdicionales: FormGroup;
  submitted = false;
  id: string | null;
  titulo = "Registrar producto";
  esAdmin: any
  dataProducto: any
  constructor(
    private fb: FormBuilder,
    private _productoService: FirebaseService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private JsonFormatter: JsonFormatterService
  ) {
    this.createProductoCaracteristicas = this.fb.group({
      codigo: ["", Validators.required],
      nombre: ["", Validators.required],
      tipo: ["", Validators.required],
      referenciaFabrica: ["", Validators.required]
    });
    this.datosInventario = this.fb.group({
      grupoInventario: ["", Validators.required],
      estado: ["", Validators.required],
      impuestoCargo: ["", Validators.required],
      inventariable: ["", Validators.required],
    });
    this.datosAdicionales = this.fb.group({
      esIncluido: ["", Validators.required],
      saldoCantidades: ["", Validators.required],
      precioVenta1: ["", Validators.required],
      precioDeCompra: ["", Validators.required],
      descripcionLarga: ["", Validators.required],
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit(): Promise<void> {
    //this.JsonFormatter.obtenerProductos()
    this.esAdmin = await this._productoService.esAdmin()
    if (this.esAdmin) {
      this.router.navigate(["/admin"])
    }
    this.esProducto();
    console.log(this.id)
  }

  addEditarProducto() {
    this.submitted = true;

    if (this.createProductoCaracteristicas.invalid
      || this.datosInventario.invalid
      || this.datosAdicionales.invalid) {
      return;
    }
    console.log(this.id)
    if (this.id === null) {
      this.addProducto();
    } else {
      this.editarProducto(this.id);
    }
  }

  async addProducto() {
    let empresa = await this._productoService.getCurrentEmpresa()
    const producto: Producto = {
      codigo: this.createProductoCaracteristicas.value.codigo,
      nombre: this.createProductoCaracteristicas.value.nombre,
      tipo: this.createProductoCaracteristicas.value.tipo,
      referenciaFabrica: this.createProductoCaracteristicas.value.referenciaFabrica,
      grupoInventario: this.datosInventario.value.grupoInventario,
      estado: this.datosInventario.value.estado,
      impuestoCargo: this.datosInventario.value.impuestoCargo,
      inventariable: this.datosInventario.value.inventariable,
      esIncluido: this.datosAdicionales.value.esIncluido,
      saldoCantidades: parseInt(this.datosAdicionales.value.saldoCantidades),
      precioVenta1: this.datosAdicionales.value.precioVenta1,
      precioDeCompra: parseInt(this.datosAdicionales.value.precioDeCompra),
      descripcionLarga: this.datosAdicionales.value.descripcionLarga,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      empresa
    };
    console.log(producto)
    this._productoService.setProducto(producto.codigo, producto)
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
            this.dataProducto = data
            this.createProductoCaracteristicas.patchValue({
              codigo: data['codigo'],
              nombre: data['nombre'],
              tipo: data['tipo'],
              referenciaFabrica: data['referenciaFabrica']
            });

            this.datosInventario.patchValue({
              grupoInventario: data['grupoInventario'],
              estado: data['estado'],
              impuestoCargo: data['impuestoCargo'],
              inventariable: data['inventariable'],
            });
            this.datosAdicionales.patchValue({
              esIncluido: data['esIncluido'],
              saldoCantidades: data['saldoCantidades'],
              precioVenta1: data['precioVenta1'],
              precioDeCompra: data['precioDeCompra'],
              descripcionLarga: data['descripcionLarga'],
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  editarProducto(id: string) {
    
    const producto: Producto = {
      codigo: this.dataProducto.codigo,
      nombre: this.createProductoCaracteristicas.value.nombre,
      tipo: this.createProductoCaracteristicas.value.tipo,
      referenciaFabrica: this.createProductoCaracteristicas.value.referenciaFabrica,
      grupoInventario: this.datosInventario.value.grupoInventario,
      estado: this.datosInventario.value.estado,
      impuestoCargo: this.datosInventario.value.impuestoCargo,
      inventariable: this.datosInventario.value.inventariable,
      esIncluido: this.datosAdicionales.value.esIncluido,
      saldoCantidades: parseInt(this.datosAdicionales.value.saldoCantidades),
      precioVenta1: this.datosAdicionales.value.precioVenta1,
      precioDeCompra: parseInt(this.datosAdicionales.value.precioDeCompra),
      descripcionLarga: this.datosAdicionales.value.descripcionLarga,
      fechaActualizacion: new Date(),
      fechaCreacion: this.dataProducto.fechaCreacion,
      empresa: this.dataProducto.empresa
    };
console.log(producto)
    this._productoService.setProducto(id, producto)
      .then(() => {
        this.router.navigate(['/productos']);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
