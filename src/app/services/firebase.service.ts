import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { Empresa } from '../entities/empresa';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //Login
  esAdminS!: boolean
  constructor(private auth: Auth, private firestore: Firestore) { }
  login(objeto: any) {
    let email = objeto.email
    let password = objeto.password
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  singup(objeto: any) {
    let email = objeto.email
    let password = objeto.password
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
  userObserver(id: string) {
    const userRef = doc(this.firestore, "usuarios", id);
    return getDoc(userRef);
  }
  cerrarSesion() {
    return signOut(this.auth)
  }
  getAuthState() {
    return authState(this.auth)
  }
  esAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getAuthState().subscribe(async res => {
        if (localStorage.getItem("registrando") === "false") {
          if (res) {
            let user = await this.userObserver(res.uid);
            let data: any = user.data();
            console.log(data.tipo === "admin")
            resolve(data.tipo === "admin");
          } else {
            resolve(false);
          }
        }

      });
    });
  }
  //Clientes
  clientes: Observable<any[]> | undefined;
  addCliente(cliente: any) {
    const addclientes = collection(this.firestore, "clientes")
    return addDoc(addclientes, cliente)
  }

  getClientes() {
    const entradaRef = collection(this.firestore, "clientes");
    return collectionData(entradaRef, { idField: 'id' }).pipe(
      map(clientes => clientes.map((cliente: any) => ({ id: cliente['id'], ...cliente })))
    );
  }
  getClientesByempresa(): Observable<any[]> {
    console.log("clientes observados")
    return from(this.getCurrentEmpresa()).pipe(
      switchMap(empresa => {
        console.log(empresa)
        const clientesRef = collection(this.firestore, 'clientes');
        const queryRef = query(clientesRef, where('empresa', '==', empresa));

        return collectionData(queryRef, { idField: 'id' }).pipe(
          map(clientes => clientes.map((cliente: any) => ({ id: cliente.id, ...cliente })))
        );
      })
    );
  }
  getVentasByCartera(clienteId: string): Observable<any[]> {
    console.log(typeof clienteId)
    const clientesRef = collection(this.firestore, 'ventas');
    const queryRef = query(
      clientesRef,
      where('idCliente', '==', clienteId),
      where('debe', '>', 0)
    );
    return collectionData(queryRef, { idField: 'id' }).pipe(
      map(ventas => ventas.map((venta: any) => ({ id: venta.id, ...venta })))
    );
  }
  
  getVentasByempresa(): Observable<any[]> {
    console.log("ventas observadas")
    return from(this.getCurrentEmpresa()).pipe(
      switchMap(empresa => {
        const ventasRef = collection(this.firestore, 'ventas');
        const queryRef = query(ventasRef, where('empresa', '==', empresa));

        return collectionData(queryRef, { idField: 'id' }).pipe(
          map(ventas => ventas.map((venta: any) => ({ id: venta.id, ...venta })))
        );
      })
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
      map(productos => productos.map((producto: any) => ({ id: producto['id'], ...producto })))
    );
  }
  getProductosByempresa(): Observable<any[]> {
    return from(this.getCurrentEmpresa()).pipe(
      switchMap(empresa => {
        const productosRef = collection(this.firestore, 'productos');
        const queryRef = query(productosRef, where('empresa', '==', empresa));
        console.log("query done Products")
        return collectionData(queryRef, { idField: 'id' }).pipe(
          map(productos => productos.map((producto: any) => ({ id: producto.id, ...producto })))
        ); 
      })
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

  async setProducto(id: string, data: any) {
    const productoRef = doc(this.firestore, "productos", id);
    await setDoc(productoRef, data);
  }

  //empresas
  empresas: Observable<any[]> | undefined;

  getEmpresas() {
    const empresasRef = collection(this.firestore, "empresas");
    return collectionData(empresasRef, { idField: 'id' }).pipe(
      map(empresas => empresas.map((empresa: any) => ({ id: empresa.id, ...empresa })))
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
      const empresaData:Empresa = (empresaSnapshot.data() as Empresa);
      return empresaData;
    } else {
      return {};
    }
  }
  async getCurrentEmpresa() {
    return new Promise<any>((resolve, reject) => {
      this.getAuthState().subscribe(async res => {
        if (res) {
          let user = await this.userObserver(res.uid);
          let data: any = user.data();
          resolve(data.empresa);
        } else {
          resolve("false");
        }


      });
    });
  }

  setEmpresa(data: any) {
    const empresaref = doc(this.firestore, "empresas", data.nit);
    return setDoc(empresaref, data);
  }
  //usuarios
  usuarios: Observable<any[]> | undefined;


  getUsuarios() {
    const entradaRef = collection(this.firestore, "usuarios");
    return collectionData(entradaRef, { idField: 'id' }).pipe(
      map(usuarios => usuarios.map((usuario: any) => ({ id: usuario['id'], ...usuario })))
    );
  }

  eliminarUsuario(id: string) {
    const usuarioRef = doc(this.firestore, "usuarios", id);
    return deleteDoc(usuarioRef);
  }

  async getUsuario(id: string) {
    const usuarioRef = doc(this.firestore, "usuarios", id);
    const usuarioSnapshot = await getDoc(usuarioRef);

    if (usuarioSnapshot.exists()) {
      const usuarioData = usuarioSnapshot.data();
      return usuarioData;
    } else {
      return null;
    }
  }

  SetUsuario(id: string, data: any) {
    console.log(id)
    const usuarioRef = doc(this.firestore, "usuarios", id);
    return setDoc(usuarioRef, data);
  }

  // Proveedores
  proveedores: Observable<any[]> | undefined;

  addProveedor(proveedor: any) {
    const proveedoresCollection = collection(this.firestore, "proveedores");
    return addDoc(proveedoresCollection, proveedor);
  }

  getProveedores() {
    const proveedoresRef = collection(this.firestore, "proveedores");
    return collectionData(proveedoresRef, { idField: 'id' }).pipe(
      map(proveedores => proveedores.map((proveedor: any) => ({ id: proveedor['id'], ...proveedor })))
    );
  }

  eliminarProveedor(id: string) {
    const proveedorRef = doc(this.firestore, "proveedores", id);
    return deleteDoc(proveedorRef);
  }

  async getProveedor(id: string) {
    const proveedorRef = doc(this.firestore, "proveedores", id);
    const proveedorSnapshot = await getDoc(proveedorRef);

    if (proveedorSnapshot.exists()) {
      const proveedorData = proveedorSnapshot.data();
      return proveedorData;
    } else {
      return null;
    }
  }

  setProveedor(id: string, data: any) {
    const proveedorRef = doc(this.firestore, "proveedores", id);
    return setDoc(proveedorRef, data);
  }
  getProveedoresByEmpresa(): Observable<any[]> {
    return from(this.getCurrentEmpresa()).pipe(
      switchMap(empresa => {
        const proveedoresRef = collection(this.firestore, 'proveedores');
        const queryRef = query(proveedoresRef, where('empresa', '==', empresa));

        return collectionData(queryRef, { idField: 'id' }).pipe(
          map(proveedores => proveedores.map((proveedor: any) => ({ id: proveedor.id, ...proveedor })))
        );
      })
    );
  }
  setVenta(venta:any){
    const addVenta = collection(this.firestore, "ventas");
    return addDoc(addVenta, venta);
  }
  async setCliente(id: string, data: any) {
    const clienteRef = doc(this.firestore, "clientes", id);
    await setDoc(clienteRef, data);
  }
  setReserva(id: string, data: any) {
    const ReservaRef = doc(this.firestore, "Reservas", id);
    return setDoc(ReservaRef, data);
  }
  updateVenta(id:string,data:any){
    const ventaRef = doc(this.firestore, "ventas", id);
    return setDoc(ventaRef, data);
  }
  async getConsecutivo(){
    let empresa:any=await this.getCurrentEmpresa()
    let consecutivo = doc(this.firestore, `consecutivo/${empresa}/consecutivo/numero`)
    return getDoc(consecutivo);
  }
  async setConsecutivo(data: any) {
    let empresa:any=await this.getCurrentEmpresa()
    let consecutivo = doc(this.firestore, `consecutivo/${empresa}/consecutivo/numero`)
    return setDoc(consecutivo, data);
  }
}
