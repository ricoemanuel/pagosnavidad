import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  displayedColumns: string[] = ['nit', 'descripcion', 'precioCompra', 'precioCompra', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  esAdmin: boolean = localStorage.getItem("esAdmin") === "true" ? true : false
  
  constructor(private router: Router, private firebaseService: FirebaseService) { 
    this.dataSource = new MatTableDataSource<Producto>();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    if (this.esAdmin) {
      this.router.navigate(["/admin"])
    }
    this.getProductos();
  }

  getProductos() {
    this.firebaseService.getProductos().subscribe(productos => {
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
}
