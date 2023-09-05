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
  async exportPDF(dataSource: any[], cliente: any, observaciones: string, vendedor: string, tipoAccion?: string, id?: number, fecha?: Date | any, fechaVencimiento?: Date | any) {
    // Crear un objeto Image
    var img = new Image();

    // Especificar la URL de la imagen
    img.src = '../../assets/images/logoS.png';

    console.log(dataSource, cliente)
    let empresa = await this.firebase.getCurrentEmpresa()
    let datosEmpresa: Empresa = await this.firebase.getEmpresa(empresa)

    const doc: any = new jsPDF();
    let consecutivoNum: any = await this.firebase.getConsecutivo()
    consecutivoNum = await consecutivoNum.data()
    consecutivoNum.numero = consecutivoNum.numero + 1

    if (fecha) {
      fecha = new Date(fecha.seconds * 1000 + fecha.nanoseconds / 1000000)
    } else {
      fecha = new Date()
    }

    let fechaVencimiento1 = new Date();
    fechaVencimiento1.setDate(fechaVencimiento1.getDate() + 30);
    if (fechaVencimiento) {
      fechaVencimiento = new Date(fechaVencimiento.seconds * 1000 + fechaVencimiento.nanoseconds / 1000000)
    } else {
      fechaVencimiento = fechaVencimiento1
    }

    let tableConfig = {
      startY: 240,
      styles: { fontSize: 9 },
      columnStyles: { 0: { columnWidth: 'auto' } },
    };
    const head = [
      ['Orden de pedido'],
      [`Télefono de contacto: ${datosEmpresa.telefono}`],
    ];
    datosEmpresa.telefono
    console.log(fecha, fechaVencimiento)
    const consecutivo = [
      ['Consecutivo', id ? id : consecutivoNum.numero],
      ['Fecha', `${fecha?.getDate()}/${fecha?.getMonth()}/${fecha?.getFullYear()}`],
      ['Fecha de vencimiento', `${fechaVencimiento?.getDate()}/${fechaVencimiento?.getMonth()}/${fechaVencimiento?.getFullYear()}`]
    ];
    const customer = [
      ['Señores', cliente.nombreTercero, 'Nombre de contacto', cliente.nombreContacto],
      ['Nit', cliente.Id, 'Teléfono', cliente.telefono],
      ['Dirección', cliente.direccion, 'Ciudad', cliente.ciudad],
    ];

    const tableData = dataSource.map((product, index) => {
      const descuentoDecimal = product.descuento / 100;
      const precioTotalConDescuento = (product.producto.precioVenta1 * (1 - descuentoDecimal)) * product.cantidad;
      const precioTotalSinDescuento = (product.producto.precioVenta1 * product.cantidad);
      return [
        index + 1,
        product.producto.codigo,
        product.producto.nombre,
        this.formattedNumberWithCommas(product.cantidad),
        `${product.descuento}%`,
        this.formattedCurrency(product.producto.precioVenta1),
        this.formattedCurrency(precioTotalSinDescuento),
        this.formattedCurrency(precioTotalConDescuento),
      ];
    });
    let observacionesData = [
      ['Observaciones:'],
      [observaciones],
    ];
    const rowHeight = 15;
    const maxRowsPerPage = Math.floor((doc.internal.pageSize.getHeight() - 60) / rowHeight);
    let totalFactura = 0;
    let totalFacturaSinDescuento = 0;
    for (let i = 0; i < tableData.length; i += maxRowsPerPage) {
      var width = doc.internal.pageSize.getWidth();
      var height = img.height * (width / img.width);
      doc.addImage(img, 'PNG', (width / 2) - 2, 3, width - 200, height - 203);
      
      doc.autoTable({
        body: observacionesData,
        startY:230,
        theme: 'plain',
        tableWidth: 'auto',
        margin: { left: 15 },
        columnStyles: {
          0: { columnWidth: 80},
        }
      });
      const currentPageData = tableData.slice(i, i + maxRowsPerPage);
      let totalPagina = 0;
      let totalPaginaSindescuento = 0;
      currentPageData.forEach(row => {
        totalPagina += Number(row[7].replace(/[^\d.-]/g, ''));
      });
      currentPageData.forEach(row => {
        totalPaginaSindescuento += Number(row[6].replace(/[^\d.-]/g, ''));
      });
      doc.autoTable({
        body: head,
        startY: 15,
        theme: 'plain',
        tableWidth: 'auto',
        margin: { left: 30 },
      });
      doc.autoTable({
        body: consecutivo,
        startY: 15,
        theme: 'grid',
        tableWidth: 'auto',
        margin: { left: 100 },
        columnStyles: {
          0: { columnWidth: 30, fontStyle: 'bold' },
          1: { columnWidth: 20 },

        }
      });
      doc.autoTable({
        body: customer,
        startY: 50,
        theme: 'grid',
        tableWidth: 'auto',
        margin: { left: 15 },
        columnStyles: {
          0: { fontStyle: 'bold' },
          2: { fontStyle: 'bold' },
        }
      });
      doc.setFillColor(217, 217, 217);
      doc.autoTable({
        startY: 80,
        head: [['Ítem', 'Código', 'Descripción', 'Cantidad', '% Desc', 'Vr. Unitario', 'Vr. Neto', 'Vr. Total']],
        body: currentPageData,
        theme: 'grid',
        didDrawPage: function (data: any) {
          doc.setFontSize(10);
          doc.text('Página ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.getHeight() - 10);
        },
      });
      totalFactura += totalPagina;
      totalFacturaSinDescuento += totalPaginaSindescuento;
      let descuentos = totalFacturaSinDescuento - totalFactura
      const data = [
        ['Subtotal', this.formattedCurrency(totalPagina)],
        ['Subtotal neto', this.formattedCurrency(totalPaginaSindescuento)],

      ];
      if (i + maxRowsPerPage < tableData.length) {
        doc.autoTable({
          body: data,
          ...tableConfig,
          theme: 'grid',
          tableWidth: 'auto',
          margin: { left: 100 },
          columnStyles: {
            0: { columnWidth: 50, fontStyle: 'bold' },
          }
        });
        doc.addPage();
      } else {
        let data = [
          ['Subtotal', this.formattedCurrency(totalPagina)],
          ['Subtotal neto', this.formattedCurrency(totalPaginaSindescuento)],
          ['Descuentos', this.formattedCurrency(descuentos)],
          ['Total a pagar', this.formattedCurrency(totalFactura)],
        ];
        doc.autoTable({
          body: data,
          ...tableConfig,
          theme: 'grid',
          tableWidth: 'auto',
          margin: { left: 100 },
          columnStyles: {
            0: { columnWidth: 50, fontStyle: 'bold' },
          }
        });
      }
      
    }
    if (tipoAccion !== 'ventasLista') {
      id = parseInt(await this.guardarVenta(dataSource, cliente, totalFactura, observaciones, vendedor, consecutivoNum, fecha!, fechaVencimiento!))
    }
    doc.save(`venta-${id}.pdf`);

  }
  async guardarVenta(
    data: any[],
    cliente: Cliente,
    totalFactura: number,
    observaciones: string,
    vendedor: string,
    consecutivo: any,
    fechaCreacion: Date,
    fechaVencimiento: Date): Promise<string> {

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

    let venta = {
      cliente,
      idCliente:cliente.Id,
      productos,
      estadoEntrega: false,
      totalFactura,
      empresa: await this.firebase.getCurrentEmpresa(),
      fechaCreacion,
      fechaVencimiento,
      numeroFactura: consecutivo.numero,
      observaciones,
      vendedor,
      debe:totalFactura
    };
    let ventaRegistrada = await this.firebase.setVenta(venta)
    await this.firebase.setConsecutivo(consecutivo)
    venta.productos.forEach(async (producto: any) => {
      let detalle = {
        cantidad: producto.cantidad,
        venta: ventaRegistrada.id,
        producto: producto.codigo
      }
      await this.firebase.setReserva(`${producto.codigo}${ventaRegistrada.id}`, detalle)
    })
    return consecutivo.numero
  }
}
