import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,signOut } from '@angular/fire/auth';
import { getAuth } from "firebase/auth";

import { Firestore, addDoc, collection, collectionData, deleteDoc,doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //Login
  authf=getAuth()
  constructor(private auth:Auth, private firestore: Firestore) { }
  login(objeto:any){
    let email=objeto.email
    let password=objeto.password
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

  getClientes() {
    const entradaRef = collection(this.firestore, "clientes");

    return collectionData(entradaRef, { idField: 'id' }).pipe(
      map(clientes => clientes.map(evento => ({ id: evento['id'], ...evento })))
    );
  }
  eliminarCliente(id: string) {
    const clienteRef = doc(this.firestore, "clientes", id);
    return deleteDoc(clienteRef);
  }

  async getCliente(id: string) {
    const clienteRef = doc(this.firestore, "clientes", id);
    const clienteSnapshot = await getDoc(clienteRef);
  
    if (clienteSnapshot.exists()) {
      const clienteData = clienteSnapshot.data();
      return clienteData;
    } else {
      return null;
    }
  }

  actualizarEmpleado(id: string, data: any) {
    const clienteRef = doc(this.firestore, "clientes", id);
    return setDoc(clienteRef, data);
  } 
}
