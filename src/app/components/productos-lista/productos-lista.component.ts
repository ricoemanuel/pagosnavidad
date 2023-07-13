import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

export interface Producto {
  nit: string;
  descripcion: string;
  precioCompra: string;
  precioVenta: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.scss']
})
export class ProductosListaComponent implements OnInit,AfterViewInit {
  dataSource: MatTableDataSource<Producto>;
  displayedColumns: string[] = ['codigo', 'descripcion', 'precioCompra', 'precioVenta', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  esAdmin: any
  @Input() showconfig!:string;
  @Output() myEvent = new EventEmitter();
  cantidad=new FormControl()
  constructor(private router: Router, private firebaseService: FirebaseService) { 
    this.dataSource = new MatTableDataSource<Producto>();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
    this.esAdmin=await this.firebaseService.esAdmin()
    if (this.esAdmin) {
      this.router.navigate(["/admin"])
    }
    this.getProductos();
    if(this.showconfig){
      console.log(this.showconfig)
      this.displayedColumns=['codigo', 'descripcion', 'precioVenta','cantidad', 'acciones'];
    }
  }

  getProductos() {
    this.firebaseService.getProductosByempresa().subscribe(productos => {
      this.dataSource.data = productos;
    });
  }

  editarProducto(producto: any) {
    this.router.navigate(['/editarproducto', producto.id]);
  }

  eliminarProducto(producto: any) {
    const id = producto.id;
    this.firebaseService.eliminarProducto(id).then(() => {
      this.getProductos();
    }).catch(error => {
      console.log('Error al eliminar el producto:', error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  emitProduct(producto:any){
    let cantidad=this.cantidad.value
    this.myEvent.emit({producto,cantidad});
  }
}
