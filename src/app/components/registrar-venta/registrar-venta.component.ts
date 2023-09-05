import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FacturaService } from 'src/app/services/factura.service';
import { Cliente } from 'src/app/entities/cliente';
import { Producto } from 'src/app/entities/producto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.scss']
})
export class RegistrarVentaComponent implements OnInit, AfterViewInit {
  venta = this.fb.group({
    producto: ["", Validators.required]
  });
  RetoCardmodalRef?: BsModalRef;
  listaProductos!: Observable<any[]>;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['codigo', 'descripcion', 'precioVenta', 'cantidad', 'descuento', 'total'];
  cliente!:Cliente;
  observaciones=''
  currentUser:string=localStorage.getItem('currentUID')!
  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private modalService: BsModalService,
    public facturaS:FacturaService,
    private Router: Router) {
    this.dataSource = new MatTableDataSource<any>();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }
  ngOnInit(): void {

  }
  openPopup(template: TemplateRef<any>) {
    this.RetoCardmodalRef = this.modalService.show(template, {
      class: 'modal-lg'
    });
  }
  AnadirProducto(eventData: any) {
    eventData.descuento === "" ? eventData.descuento = 0 : eventData.descuento = parseFloat(eventData.descuento)
    eventData.cantidad = parseFloat(eventData.cantidad)
     if (!Number.isNaN(eventData.descuento) && !Number.isNaN(eventData.cantidad)) {
       const existingProductIndex = this.dataSource.data.findIndex((item) => item.producto.codigo === eventData.producto.codigo);
       if (existingProductIndex !== -1) {
         this.dataSource.data[existingProductIndex].cantidad = eventData.cantidad;
         this.dataSource.data[existingProductIndex].descuento = eventData.descuento;
       } else {
         this.dataSource.data.push(eventData);
       }
       this.dataSource.data = [...this.dataSource.data];
       
     }

  }
  
  handleProducto(eventData:any[]){
    eventData.forEach((producto:any)=>{
      this.AnadirProducto(producto)
    })
    this.RetoCardmodalRef?.hide();
    console.log(this.dataSource.data)
  }
  handleCliente(eventData:Cliente){
    this.cliente=eventData
    this.RetoCardmodalRef?.hide();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async guardarVenta(){
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Guardando venta...',
      showConfirmButton: false,
    })
    await this.facturaS.exportPDF(this.dataSource.data,this.cliente!, this.observaciones, this.currentUser)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Venta guardada',
      showConfirmButton: false,
      timer: 1500
    }).then(()=>{
      this.Router.navigate(['/ventas'])
    })
  }
  
    
  




}
