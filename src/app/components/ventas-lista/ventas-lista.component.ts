import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { VentasService } from 'src/app/services/observers/ventas.service';

@Component({
  selector: 'app-ventas-lista',
  templateUrl: './ventas-lista.component.html',
  styleUrls: ['./ventas-lista.component.scss']
})
export class VentasListaComponent {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nombre','valor','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  esAdmin: any
  exportData!:any[]
  id: any;
  
  constructor(private firebaseService: FirebaseService, 
    private router: Router, 
    private Ventas:VentasService,
    public facturaS:FacturaService,
    private aRoute: ActivatedRoute) {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.paginator = this.paginator;
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
    this.esAdmin=await this.firebaseService.esAdmin()
    if (this.esAdmin) {
      this.router.navigate(["/admin"])
    }
    if(!this.id){
      this.getVentas();
    }else{
this.getVentasCartera();
    }
    
  }

  getVentas() {
    this.Ventas.provideVenta().subscribe((Ventas:any) => {
      this.dataSource.data = Ventas;
      
    });
  }
  getVentasCartera() {
    this.firebaseService.getVentasByCartera(this.id).subscribe((Ventas:any)=>{
      console.log(Ventas)
      this.dataSource.data=Ventas
    })
  }

  editarVenta(Venta: any) {
    this.router.navigate(['/editarVenta', Venta.id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportVenta(element:any){
    element.productos.forEach((producto:any)=>{
      producto.producto={
        precioVenta1:producto.precio,
        codigo:producto.codigo,
        nombre:producto.nombre
      }
     delete producto.precio
     delete producto.codigo
    })
    this.facturaS.exportPDF(element.productos,element.cliente,element.observaciones,element.vendedor,'ventasLista',element.numeroFactura, element.fechaCreacion,element.fechaVencimiento)
  }
}
