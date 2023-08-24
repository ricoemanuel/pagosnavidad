import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, mergeMap } from 'rxjs';
import { Producto } from 'src/app/entities/producto';
import { FirebaseService } from 'src/app/services/firebase.service';
import { JsonFormatterService } from 'src/app/services/json-formatter.service';
import { ProductosService } from 'src/app/services/observers/productos.service';



@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.scss']
})
export class ProductosListaComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['codigo', 'nombre', 'precioVenta', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  esAdmin: any
  @Input() showconfig!: string;
  @Output() myEvent = new EventEmitter();
  cantidad!: FormGroup
  descuento!: FormGroup
  precio!: FormGroup
  suscription: any;
  constructor(private router: Router,
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private JsonFormatter: JsonFormatterService,
    private productos:ProductosService) {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.paginator = this.paginator;
    this.getProductos();
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
    
    this.esAdmin = await this.firebaseService.esAdmin()
    if (this.esAdmin) {
      this.router.navigate(["/admin"])
    }

    if (this.showconfig) {
      console.log(this.showconfig)
      this.displayedColumns = ['codigo', 'nombre', 'precioVenta','stock', 'cantidad', 'descuento', 'acciones'];
    }
  }

  getProductos() {
    this.suscription= this.productos.provideProducto().subscribe((productos: any) => {
      
      this.dataSource.data = productos;
      this.cantidad = this.fb.group({});
      this.descuento = this.fb.group({});
      this.precio = this.fb.group({});
      
      const cantidadControls: { [key: string]: FormControl } = {};
      const descuentoControls: { [key: string]: FormControl } = {};
      const precioControls: { [key: string]: FormControl } = {};
      
      productos.forEach((producto: Producto) => {
        cantidadControls[producto.codigo] = new FormControl('');
        descuentoControls[producto.codigo] = new FormControl('');
        precioControls[producto.codigo] = new FormControl('');
      });
      
      this.cantidad = new FormGroup(cantidadControls);
      this.descuento = new FormGroup(descuentoControls);
      this.precio = new FormGroup(precioControls);
      
        
      
    })
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
  emitProduct() {
    this.myEvent.emit(this.listado);

  }
  listado:any[]=[]
  agregarProducto(producto: Producto){
     let codigo = producto.codigo
     let cantidad = this.cantidad.value[codigo]
     let descuento = this.descuento.value[codigo]
     let precio=this.precio.value[codigo]
     if (cantidad !== "" ) {
       if (producto.precioVenta1 === 0 && precio!=="") {
         producto.precioVenta1 = parseFloat(precio)
       }
       this.listado.push({ producto, cantidad, descuento });
     }
    
  }
  obtenerProductos() {
    this.JsonFormatter.obtenerProductos()
  }
}
