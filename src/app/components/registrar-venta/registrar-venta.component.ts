import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FacturaService } from 'src/app/services/factura.service';



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

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private modalService: BsModalService,
    public facturaS:FacturaService) {
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
  handleEvent(eventData: any) {
    eventData.descuento === "" ? eventData.descuento = 0 : eventData.descuento = parseFloat(eventData.descuento)
    eventData.cantidad = parseFloat(eventData.cantidad)
    this.dataSource.data = [...this.dataSource.data];
    this.dataSource.data.push(eventData);
    // if (!Number.isNaN(eventData.descuento) && !Number.isNaN(eventData.cantidad)) {
    //   const existingProductIndex = this.dataSource.data.findIndex((item) => item.producto.codigo === eventData.producto.codigo);
    //   if (existingProductIndex !== -1) {
    //     this.dataSource.data[existingProductIndex].cantidad = eventData.cantidad;
    //     this.dataSource.data[existingProductIndex].descuento = eventData.descuento;
    //   } else {
    //     this.dataSource.data.push(eventData);
    //   }
    //   this.dataSource.data = [...this.dataSource.data];
    //   this.RetoCardmodalRef?.hide();
    // }

  }
  editarProducto(element: any) {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  




}
