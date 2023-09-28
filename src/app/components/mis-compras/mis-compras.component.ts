import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as QRCode from 'qrcode-generator';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.scss']
})
export class MisComprasComponent implements OnInit{
  dataSource!:MatTableDataSource<any>
  baseSeleccionada=""
  displayedColumns: string[] = ['QR', 'Evento', 'Valor','asientos', 'zonas'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private firebase: FirebaseService,private modalService: BsModalService,){}
  async ngOnInit(): Promise<void> {
    this.firebase.getAuthState().subscribe(user=>{
      this.firebase.getCurrentFacturas(user!.uid).subscribe(res=>{
        console.log(res)
        res=res.filter((factura:any)=>{
          return factura.transaccion.data.transaction.status!=='ERROR' && factura.asientos.length>0
        })
        this.dataSource=new MatTableDataSource(res)
    this.dataSource.paginator = this.paginator;
      })
    })
  }
  generateQRCodeBase64(qrData:string) {
    const qr = QRCode(0, 'L');
    qr.addData(qrData);
    qr.make();
    return qr.createDataURL(10, 0);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openQR(codigo:string,template: TemplateRef<any>){
    this.baseSeleccionada=codigo
    this.openModal(template)
  }
  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);


  }
  formatAsientos(asientos:any[]){
    let asientosString:string=""
    asientos.forEach(asiento=>{
      asientosString+=(asiento.split("/")[1]+', ')
    })
    return asientosString.slice(0,-2)
  }
  formatZonas(asientos:any[]){
    let asientosString:string[]=[]
    asientos.forEach(asiento=>{
      asientosString.push(asiento.split(",")[0])
    })
    asientosString = asientosString.filter((item,index)=>{
      return asientosString.indexOf(item) === index;
    })
    return asientosString
  }
}
