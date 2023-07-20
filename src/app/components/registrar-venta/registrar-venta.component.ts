import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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
  displayedColumns: string[] = ['codigo', 'descripcion', 'precioVenta', 'cantidad', 'descuento'];

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private modalService: BsModalService,) {
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
     if (!Number.isNaN(eventData.descuento) && !Number.isNaN(eventData.cantidad)) {
       const existingProductIndex = this.dataSource.data.findIndex((item) => item.producto.codigo === eventData.producto.codigo);
       if (existingProductIndex !== -1) {
         this.dataSource.data[existingProductIndex].cantidad = eventData.cantidad;
         this.dataSource.data[existingProductIndex].descuento = eventData.descuento;
       } else {
         this.dataSource.data.push(eventData);
       }
       this.dataSource.data = [...this.dataSource.data];
       this.RetoCardmodalRef?.hide();
     }

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
  @ViewChild('factura',{ static: false }) pdfTable!: ElementRef;
  exportPDF() {
    const doc:any = new jsPDF();
    let yPosition = 20;
    const headerText = 'Grupo sincro\nTeléfono: 2222222\nCiudad: Bello';
    doc.setFontSize(18);
    doc.setFontSize(12);
    doc.setTextColor(100);
    // Prepare the data for the table
    const tableData = this.dataSource.data.map(product => [
      product.cantidad,
      product.descuento,
      product.producto.codigo,
      product.producto.precioVenta,
      product.producto.descripcion
    ]);
    // Calculate the number of rows that fit in one page
    const rowHeight = 6; // Adjust the row height as needed
    const maxRowsPerPage = Math.floor((doc.internal.pageSize.getHeight() - yPosition) / rowHeight);

    // Generate the table in multiple pages
    let currentPage = 1;
    let remainingRows = tableData.length;

    while (remainingRows > 0) {
      if (currentPage !== 1) {
        doc.addPage();
      }

      doc.text(headerText, 15, 20);
      doc.setFillColor(217, 217, 217);
      doc.autoTable({
        startY: yPosition + 30,
        head: [['Cantidad', 'Descuento', 'Código', 'Precio', 'Descripción']],
        body: tableData.slice((currentPage - 1) * maxRowsPerPage, currentPage * maxRowsPerPage),
      });

      currentPage++;
      remainingRows -= maxRowsPerPage;
    }

    doc.save('productos.pdf');
  }
  

}
