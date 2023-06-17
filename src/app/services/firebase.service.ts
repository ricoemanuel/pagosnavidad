import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,signOut } from '@angular/fire/auth';
import { getAuth } from "firebase/auth";

import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //Login
  authf=getAuth()
  constructor(private auth:Auth, private firestore: Firestore) { }
  login(objeto:any){
    let email=objeto["email"]
    let password=objeto["password"]
    return signInWithEmailAndPassword(this.auth,email,password)
  }
  userObserver(){
    let usuario=this.auth.currentUser
    return usuario
  }
  cerrarSesion(){
    return signOut(this.auth)
  }

  //Clientes
  clientes: Observable<any[]> | undefined;
  addCliente(cliente: any) {
    const addclientes =collection(this.firestore, "clientes")
    return addDoc(addclientes,cliente)
  }
}
