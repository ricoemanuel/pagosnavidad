import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  Venta$: BehaviorSubject<any>;
  Venta!: any;

  constructor(
    private Firebase:FirebaseService
    ) {
    this.Venta$=new BehaviorSubject(this.Venta)
   }

  getVenta$(Venta:any){
    this.Venta=Venta
    this.Venta$.next(this.Venta)
  }
  provideVenta():Observable <any>{
    if(!this.Venta$.value){
      this.updateObs()
    }
    return this.Venta$.asObservable()
  }
  async updateObs(){
    this.Firebase.getVentasByempresa().subscribe((Ventas:any[])=>{
      this.getVenta$(Ventas)
    }) 
  }
}
