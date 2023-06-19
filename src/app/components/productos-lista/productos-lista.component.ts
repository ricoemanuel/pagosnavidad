import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.scss']
})
export class ProductosListaComponent implements OnInit {
  productos: any[] = [];

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.firebaseService.getProductos().subscribe(productos => {
      this.productos = productos;
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

  agregarProducto() {
    // Lógica para agregar un nuevo producto
    this.router.navigate(['/registrarproducto']);
  }
}
