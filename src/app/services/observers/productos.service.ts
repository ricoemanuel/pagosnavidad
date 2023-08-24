import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Producto } from 'src/app/entities/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  Producto$: BehaviorSubject<Producto>;
  Producto!: Producto;

  constructor(
    private Firebase:FirebaseService
    ) {
    this.Producto$=new BehaviorSubject(this.Producto)
   }

  getProducto$(Producto:any){
    this.Producto=Producto
    this.Producto$.next(this.Producto)
  }
  provideProducto():Observable <Producto>{
    if(!this.Producto$.value){
      this.updateObs()
    }
    return this.Producto$.asObservable()
  }
  async updateObs(){
    this.Firebase.getProductosByempresa().subscribe((Productos:Producto[])=>{
      this.getProducto$(Productos)
    }) 
  }
}
