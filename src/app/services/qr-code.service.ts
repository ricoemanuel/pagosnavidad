import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode-generator';
@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor() { }

  generateQRCodeBase64(data: string): string {
    const qr = QRCode(0, 'H');
    qr.addData(data);
    qr.make();
    return qr.createDataURL(400, 400);
  }
}
