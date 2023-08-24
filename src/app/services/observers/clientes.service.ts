import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Cliente } from 'src/app/entities/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  Cliente$: BehaviorSubject<Cliente>;
  Cliente!: Cliente;

  constructor(
    private Firebase:FirebaseService
    ) {
    this.Cliente$=new BehaviorSubject(this.Cliente)
   }

  getCliente$(Cliente:any){
    this.Cliente=Cliente
    this.Cliente$.next(this.Cliente)
  }
  provideCliente():Observable <Cliente>{
    if(!this.Cliente$.value){
      this.updateObs()
    }
    return this.Cliente$.asObservable()
  }
  async updateObs(){
    this.Firebase.getClientesByempresa().subscribe((Clientes:Cliente[])=>{
      this.getCliente$(Clientes)
    }) 
  }
}
