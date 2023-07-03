import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss']
})
export class FormProductosComponent implements OnInit{
  createProductoCaracteristicas: FormGroup;
  createProductoCostos: FormGroup;
  submitted = false;
  id: string | null;
  titulo = "Registrar producto";
  esAdmin: any
  dataProducto:any
  constructor(
    private fb: FormBuilder,
    private _productoService: FirebaseService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createProductoCaracteristicas = this.fb.group({
      codigo: ["", Validators.required],
      descripcion: ["", Validators.required]
    });

    this.createProductoCostos = this.fb.group({
      precioCompra: ["", Validators.required],
      precioVenta: ["", Validators.required]
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit(): Promise<void> {
    this.esAdmin=await this._productoService.esAdmin()
    if(this.esAdmin){
      this.router.navigate(["/admin"])
    }
    this.esProducto();
  }

  addEditarProducto() {
    this.submitted = true;

    if (this.createProductoCaracteristicas.invalid || this.createProductoCostos.invalid) {
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
    let empresa= await this._productoService.getCurrentEmpresa()
    const producto: any = {
      codigo: this.createProductoCaracteristicas.value.codigo,
      descripcion: this.createProductoCaracteristicas.value.descripcion,
      precioCompra: this.createProductoCostos.value.precioCompra,
      precioVenta: this.createProductoCostos.value.precioVenta,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      empresa:empresa
    };

    this._productoService.setProducto(producto.codigo,producto)
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
            this.dataProducto=data
            this.createProductoCaracteristicas.patchValue({
              codigo: data['codigo'],
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
    console.log(this.dataProducto)
    const producto: any = {
      codigo: this.dataProducto.codigo,
      descripcion: this.createProductoCaracteristicas.value.descripcion,
      precioCompra: this.createProductoCostos.value.precioCompra,
      precioVenta: this.createProductoCostos.value.precioVenta,
      fechaActualizacion: new Date(),
      fechaCreacion: this.dataProducto.fechaCreacion,
      empresa:this.dataProducto.empresa
      
    };

    this._productoService.setProducto(id, producto)
      .then(() => {
        this.router.navigate(['/productos']);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
