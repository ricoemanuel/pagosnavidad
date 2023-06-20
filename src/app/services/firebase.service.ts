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
  userObserver(id:string){
    const userRef = doc(this.firestore, "usuarios", id);
    return getDoc(userRef);
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

  //Productos
  productos: Observable<any[]> | undefined;

  addProducto(producto: any) {
    const addProductos = collection(this.firestore, "productos");
    return addDoc(addProductos, producto);
  }

  getProductos() {
    const productosRef = collection(this.firestore, "productos");

    return collectionData(productosRef, { idField: 'id' }).pipe(
      map(productos => productos.map(producto => ({ id: producto['id'], ...producto })))
    );
  }

  eliminarProducto(id: string) {
    const productoRef = doc(this.firestore, "productos", id);
    return deleteDoc(productoRef);
  }

  async getProducto(id: string) {
    const productoRef = doc(this.firestore, "productos", id);
    const productoSnapshot = await getDoc(productoRef);
    
    if (productoSnapshot.exists()) {
      const productoData = productoSnapshot.data();
      return productoData;
    } else {
      return null;
    }
  }

  actualizarProducto(id: string, data: any) {
    const productoRef = doc(this.firestore, "productos", id);
    return setDoc(productoRef, data);
  }

  //empresas
  empresas: Observable<any[]> | undefined;

  getEmpresas() {
    const empresasRef = collection(this.firestore, "empresas");
    return collectionData(empresasRef, { idField: 'id' }).pipe(
      map(empresas => empresas.map((empresa:any) => ({ id: empresa.id, ...empresa })))
    );
  }

  eliminarEmpresa(id: string) {
    const empresaRef = doc(this.firestore, "empresas", id);
    return deleteDoc(empresaRef);
  }

  async getEmpresa(id: string) {
    const empresaRef = doc(this.firestore, "empresas", id);
    const empresaSnapshot = await getDoc(empresaRef);
    if (empresaSnapshot.exists()) {
      const productoData = empresaSnapshot.data();
      return productoData;
    } else {
      return null;
    }
  }

  setEmpresa( data: any) {
    const empresaref = doc(this.firestore, "empresas", data.nit);
    return setDoc(empresaref, data);
  }
}
