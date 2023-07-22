import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  constructor() { }
  formattedCurrency = (value: any) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  formattedNumberWithCommas = (value: any) => value.toLocaleString('en-US');
  exportPDF(dataSource:any[]) {
    const doc: any = new jsPDF();
    let tableConfig = {
      startY: 250, 
      styles: { fontSize: 14 },
      columnStyles: { 0: { columnWidth: 'auto' } }, 
    };
    const head = [
      ['Empresa:', 'Grupo Sincro'],
      ['Ciudad', 'Bello'],
      ['Teléfono', '222222222'],
    ];
    const tableData = dataSource.map(product => {
      const descuentoDecimal = product.descuento / 100;
      const precioTotalConDescuento = (product.producto.precioVenta * (1 - descuentoDecimal)) * product.cantidad;
      return [
        product.producto.codigo,
        product.producto.descripcion,
        this.formattedNumberWithCommas(product.cantidad),
        `${product.descuento}%`,
        this.formattedCurrency(product.producto.precioVenta),
        this.formattedCurrency(precioTotalConDescuento),
      ];
    });
    const rowHeight = 12;
    const maxRowsPerPage = Math.floor((doc.internal.pageSize.getHeight() - 60) / rowHeight);
    let totalFactura = 0;
    for (let i = 0; i < tableData.length; i += maxRowsPerPage) {
      const currentPageData = tableData.slice(i, i + maxRowsPerPage);
      let totalPagina = 0;
      currentPageData.forEach(row => {
        totalPagina += Number(row[5].replace(/[^\d.-]/g, ''));
      });
      doc.autoTable({
        body: head,
        startY:15,
        theme: 'grid', 
        tableWidth: 'auto', 
        margin: { left: 15 }, 
      });
      doc.setFillColor(217, 217, 217);
      doc.autoTable({
        startY: 50,
        head: [['Código', 'Descripción', 'Cantidad', 'Descuento', 'Precio', 'Precio Total']],
        body: currentPageData,
        didDrawPage: function (data: any) {
          doc.setFontSize(10);
          doc.text('Página ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.getHeight() - 10);
        },
      });
      totalFactura += totalPagina;
      const data = [
        ['Total de la Pagina:', this.formattedCurrency(totalPagina)],
        
      ];
      if (i + maxRowsPerPage < tableData.length) {
        doc.autoTable({
          body: data,
          ...tableConfig,
          theme: 'grid', 
          tableWidth: 'auto', 
          margin: { left: 15 }, 
        });
        doc.addPage();
      }else{
        let data = [
          ['Total de la Pagina:', this.formattedCurrency(totalPagina)],
          ['Total de la Factura:', this.formattedCurrency(totalFactura)],
        ];
        doc.autoTable({
          body: data,
          ...tableConfig,
          theme: 'grid', 
          tableWidth: 'auto', 
          margin: { left: 15 }, 
        });
      }
    }
    doc.save('productos.pdf');
  }
}
