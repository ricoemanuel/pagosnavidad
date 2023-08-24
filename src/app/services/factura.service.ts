import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FirebaseService } from './firebase.service';
import { Empresa } from '../entities/empresa';
import { Cliente } from '../entities/cliente';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  constructor(private firebase: FirebaseService) { }
  formattedCurrency = (value: any) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  formattedNumberWithCommas = (value: any) => value.toLocaleString('en-US');
  async exportPDF(dataSource: any[], cliente: any, tipoAccion?:string, id?:string) {
    console.log(dataSource, cliente)
    let empresa = await this.firebase.getCurrentEmpresa()
    let datosEmpresa: Empresa = await this.firebase.getEmpresa(empresa)
    
    const doc: any = new jsPDF();
    let tableConfig = {
      startY: 250,
      styles: { fontSize: 14 },
      columnStyles: { 0: { columnWidth: 'auto' } },
    };
    const head = [
      [datosEmpresa.nombre,],
      [datosEmpresa.ciudad,],
      [datosEmpresa.telefono,],
    ];
    cliente.ciudad==='Medell�n'?cliente.ciudad='Medellín':cliente.ciudad
    const customer = [
      [cliente.Id,cliente.ciudad],
      [cliente.nombreTercero,cliente.direccion],
      [cliente["telefono."],cliente.telefono],
    ];
   
    const tableData = dataSource.map(product => {
      const descuentoDecimal = product.descuento / 100;
      const precioTotalConDescuento = (product.producto.precioVenta1 * (1 - descuentoDecimal)) * product.cantidad;
      return [
        product.producto.codigo,
        product.producto.nombre,
        this.formattedNumberWithCommas(product.cantidad),
        `${product.descuento}%`,
        this.formattedCurrency(product.producto.precioVenta1),
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
        startY: 15,
        theme: 'plain',
        tableWidth: 'auto',
        margin: { left: 15 },
      });
      doc.autoTable({
        body: customer,
        startY: 15,
        theme: 'grid',
        tableWidth: 'auto',
        margin: { left: 50 },
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
      } else {
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
    
    if(tipoAccion!=='ventasLista'){let id: string = await this.guardarVenta(dataSource, cliente, totalFactura)}
    doc.save(`venta-${id}.pdf`);

  }
  async guardarVenta(data: any[], cliente: Cliente, totalFactura: number): Promise<string> {
    let dataC: any[] = [...data]
    let productos: any[] = []
    dataC.forEach((elemento: any) => {
      let obj: any = elemento
      obj.codigo = obj.producto.codigo
      obj.precio = obj.producto.precioVenta1
      obj.nombre = obj.producto.nombre
      delete obj.producto
      productos.push(obj)
    })
    let fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);
    let venta = {
      cliente,
      productos,
      estadoEntrega: false,
      totalFactura,
      empresa: await this.firebase.getCurrentEmpresa(),
      fechaCreacion: new Date(),
      fechaVencimiento: fechaVencimiento
    };

    let ventaRegistrada = await this.firebase.setVenta(venta)
    venta.productos.forEach(async (producto: any) => {
      let detalle = {
        cantidad: producto.cantidad,
        venta: ventaRegistrada.id,
        producto: producto.codigo
      }
      await this.firebase.setReserva(`${producto.codigo}${ventaRegistrada.id}`, detalle)
    })
    return ventaRegistrada.id
  }
}
