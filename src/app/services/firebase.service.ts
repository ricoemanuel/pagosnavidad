import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from '@angular/fire/firestore';
import { EMPTY, Observable, catchError, distinctUntilChanged, from, interval, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Database, Query, object, objectVal, ref, remove } from '@angular/fire/database'
import { traceUntilFirst } from '@angular/fire/performance';
import { environment } from 'src/environments/environment';
import * as QRCode from 'qrcode-generator';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private apiUrl = 'https://myticketeventos-default-rtdb.firebaseio.com/transacciones.json';

  esAdminS!: boolean
  constructor(private database: Database, private auth: Auth, private firestore: Firestore, private http: HttpClient, private db: Database) { }
  login(objeto: any) {
    let email = objeto.email
    let password = objeto.password
    return signInWithEmailAndPassword(this.auth, email, password)
  }
  getDatosWompi(): Observable<any> {
    return interval(100).pipe(
      switchMap(() => this.http.get<any>(this.apiUrl)),
      distinctUntilChanged() // Emite solo si los datos son diferentes a los previos
    );
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

  async getevento(id: string) {
    const eventoRef = doc(this.firestore, "eventos", id);
    const eventoSnapshot = await getDoc(eventoRef);

    if (eventoSnapshot.exists()) {
      const eventoData = eventoSnapshot.data();
      return eventoData;
    } else {
      return null;
    }
  }
  getAsientoRealtime(fila: number, columna: number, evento: string): Observable<DocumentData[]> {
    const entradaRef = collection(this.firestore, 'asientos');
    const q = query(entradaRef, where('fila', '==', fila), where('columna', '==', columna), where('evento', '==', evento));

    return new Observable<DocumentData[]>(observer => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const asientos: DocumentData[] = [];
        snapshot.forEach(doc => {
          asientos.push(doc.data());
        });
        observer.next(asientos);
      });

      // Unsubscribe function
      return () => {
        unsubscribe();
      };
    });
  }
  getAsientoRealtimeByEvento(evento: string): Observable<DocumentData[]> {
    const entradaRef = collection(this.firestore, 'asientos');
    const q = query(entradaRef, where('evento', '==', evento));
    return new Observable<DocumentData[]>(observer => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const asientos: DocumentData[] = [];
        snapshot.forEach(doc => {
          asientos.push(doc.data());
        });
        observer.next(asientos);
      });
      return () => {
        unsubscribe();
      };
    });
  }
  getAsientoRealtimeByUsuarioEstado(user: string, evento: string): Observable<DocumentData[]> {
    const entradaRef = collection(this.firestore, 'asientos');
    const q = query(entradaRef, where('clienteUser', '==', user), where('clienteEstado', '==', 'sin pagar'), where('evento', '==', evento));
    return new Observable<DocumentData[]>(observer => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const asientos: DocumentData[] = [];
        snapshot.forEach(doc => {
          asientos.push(doc.data());
        });
        observer.next(asientos);
      });
      return () => {
        unsubscribe();
      };
    });
  }
  async getAsientoByUsuarioEstado(user: string, evento: string): Promise<DocumentData[]> {
    const entradaRef = collection(this.firestore, 'asientos');
    const q = query(entradaRef, where('clienteUser', '==', user), where('clienteEstado', '==', 'sin pagar'), where('evento', '==', evento));

    try {
      const snapshot = await getDocs(q);
      const asientos: DocumentData[] = [];
      snapshot.forEach(doc => {
        asientos.push(doc.data());
      });
      return asientos;
    } catch (error) {
      throw error; // Puedes manejar el error según tus necesidades
    }
  }
  async getAsientoByEstadoString(estado: string): Promise<DocumentData[]> {
    const entradaRef = collection(this.firestore, 'asientos');
    const q = query(entradaRef, where('estado', '==', estado), where('evento', '!=', '0pRlSIWu9Cxyv7X8s8TQ'));

    try {
      const snapshot = await getDocs(q);
      const asientos: DocumentData[] = [];
      snapshot.forEach(doc => {
        const asientoData = doc.data();
        const asientoWithId = { id: doc.id, ...asientoData };
        asientos.push(asientoWithId);
      });
      return asientos;
    } catch (error) {
      throw error; // Puedes manejar el error según tus necesidades
    }
  }

  async getAsientoByEstado(user: string, evento: string): Promise<DocumentData[]> {
    const entradaRef = collection(this.firestore, 'asientos');
    const q = query(entradaRef, where('clienteEstado', '==', 'sin pagar'), where('evento', '==', evento));

    try {
      const snapshot = await getDocs(q);
      const asientos: DocumentData[] = [];
      snapshot.forEach(doc => {
        asientos.push(doc.data());
      });
      return asientos;
    } catch (error) {
      throw error; // Puedes manejar el error según tus necesidades
    }
  }
  async getAsientoByEvento(evento: string): Promise<DocumentData[]> {
    const entradaRef = collection(this.firestore, 'asientos');
    const q = query(entradaRef, where('evento', '==', evento));

    try {
      const snapshot = await getDocs(q);
      const asientos: DocumentData[] = [];
      snapshot.forEach(doc => {
        asientos.push(doc.data());
      });
      return asientos;
    } catch (error) {
      throw error; // Puedes manejar el error según tus necesidades
    }
  }
  async getAsientoByLibre(): Promise<DocumentData[]> {
    const entradaRef = collection(this.firestore, 'asientos');
    const q = query(entradaRef, where('evento', '==', 'Mu5vLrRQqVJ8Su9wjpHW'));
    try {
      const snapshot = await getDocs(q);
      const asientos: DocumentData[] = [];
      snapshot.forEach(doc => {
        asientos.push(doc.data());
      });
      return asientos;
    } catch (error) {
      console.error("Error al obtener los asientos:", error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }


  actualizarAsiento(asiento: any) {
    const entradaRef = doc(this.firestore, "asientos", `f${asiento.fila}c${asiento.columna}-${asiento.evento}`)
    return setDoc(entradaRef, asiento)
  }
  actualizarFactura(factura: any, id: string) {
    const entradaRef = doc(this.firestore, "facturas", id)
    return setDoc(entradaRef, factura)
  }
  getAsiento(asiento: any) {
    const entradaRef = doc(this.firestore, "asientos", `f${asiento.fila}c${asiento.columna}-${asiento.evento}`)
    return getDoc(entradaRef)
  }
  async getUser(uid: string) {
    const usuarioRef = doc(this.firestore, "usuarios", uid);
    const usuarioSnapshot = await getDoc(usuarioRef);

    if (usuarioSnapshot.exists()) {
      const usuarioData = usuarioSnapshot.data();
      return usuarioData;
    } else {
      return null;
    }
  }
  async setUser(obj: any, uid: string) {
    const usuarioRef = doc(this.firestore, "usuarios", uid)
    return setDoc(usuarioRef, obj)
  }
  getAsientosByEventoAndZona(eventoId: string, zona: string) {
    const entradaRef = collection(this.firestore, 'asientos');
    const q = query(entradaRef, where('nombreZona', '==', zona), where('evento', '==', eventoId));
    return new Observable<DocumentData[]>(observer => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const asientos: DocumentData[] = [];
        snapshot.forEach(doc => {
          asientos.push(doc.data());
        });
        observer.next(asientos);
      });
      return () => {
        unsubscribe();
      };
    });
  }
  getAsientosByEvento(eventoId: string) {
    const entradaRef = collection(this.firestore, 'asientos');
    const q = query(entradaRef, where('evento', '==', eventoId));
    return new Observable<DocumentData[]>(observer => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const asientos: DocumentData[] = [];
        snapshot.forEach(doc => {
          asientos.push(doc.data());
        });
        observer.next(asientos);
      });
      return () => {
        unsubscribe();
      };
    });
  }
  transactions(): Observable<any> {
    const doc = ref(this.database, 'transacciones');
    let transactions$: Observable<any> = objectVal(doc).pipe(
      traceUntilFirst('database')
    );
    return transactions$
  }

  async registrarFactura(transaccion: any, uid: string, evento: string, asientos: string[], eventoData: any, detalle: any) {
    let obj: any = {
      transaccion,
      uid,
      evento,
      asientos,
      eventoData,
      detalle
    }
    const facturaRef = collection(this.firestore, "facturas")
    let doc: DocumentReference = await addDoc(facturaRef, obj)
    await this.setEmail(uid, doc.id)
  }

  async valirdarAsientos(id: string, user: string) {
    this.getAsientoByUsuarioEstado(user, id).then(res => {
      res.forEach(async (asiento: any) => {
        asiento.clienteEstado = "null"
        asiento.clienteUser = "null"
        asiento.estado = "libre"
        await this.actualizarAsiento(asiento)
      })
    })

  }
  getCurrentFacturas(uid: string): Observable<DocumentData[]> {
    const entradaRef = collection(this.firestore, 'facturas');
    const q = query(entradaRef, where('uid', '==', uid));

    return new Observable<DocumentData[]>(observer => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const asientos: DocumentData[] = [];

        snapshot.forEach(doc => {
          const dataWithId = { ...doc.data(), id: doc.id };
          asientos.push(dataWithId);
        });

        observer.next(asientos);
      });

      return () => {
        unsubscribe();
      };
    });

  }

  getFacturas(): Observable<DocumentData[]> {
    const facturasRef = collection(this.firestore, 'facturas');

    return new Observable<DocumentData[]>(observer => {
      const unsubscribe = onSnapshot(facturasRef, snapshot => {
        const facturas: DocumentData[] = [];

        snapshot.forEach(doc => {
          const dataWithId = { ...doc.data(), id: doc.id };
          facturas.push(dataWithId);
        });

        observer.next(facturas);
      });

      return () => {
        unsubscribe();
      };
    });
  }
  async getImage() {
    const userRef = doc(this.firestore, "imagenes", 'mLhC6d9suMmzYhJZeNBo');
    let docImg = await getDoc(userRef);
    return docImg.data()
  }
  async setEmail(user: string, codigo:string) {
    let doc = await this.userObserver(user)
    let imagen:any=await this.getImage()
    let userData: any = doc.data()
    if (userData) {
      let data = {
        to: [userData.email],
        message: {
          subject: 'Bienvenido a Halloween encantado',
          text: 'Estamos contentos de que participes en este mágico evento.',
          html: `<code>
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
          </head>
          <body style="
          text-align: center;">
          <h1 style="color: #333;">¡Hola, ${userData.nombre}!</h1>
          <h3 style="color: #333;">Estamos felices de que hagas parte de este mágico día.</h3>
            <div style="{display: flex;
            justify-content: center;
            align-items: center;}">
              <a><img style="{cursor:pointer}" width="800" src="cid:arte" alt="Imagen"></a>
            </div>
            <p>Presenta este QR en la entrada de tu evento.</p>
            <div style="{display: flex;
              justify-content: center;
              align-items: center;}">
                <a><img width="200" src="cid:qrCode" alt="Imagen"></a>
            </div>
            <div style="{display: flex;
              justify-content: center;
              align-items: center;}">
              <button style="background-color: #381346; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;"><a href="https://halloweenpagos.web.app/mis-compras" style="text-decoration: none; color: white;">Mira tus entradas aquí</a></button>
            </div>
            <div style="{display: flex;
              justify-content: center;
              align-items: center;}">
              © Copyright 2023  Todos los derechos reservados www.myticket.com.co
            </div>
          </body>
          </html>
          </code>`,
          attachments: [{
            filename: 'arte.jpg',
            path: imagen.imagen,
            cid: 'arte'
        },{
          filename: 'qrCode.png',
          path: this.generateQRCodeBase64(codigo),
          cid: 'qrCode'
      }]
        }
      }
      const facturaRef = collection(this.firestore, "mail")
      await addDoc(facturaRef, data)
    }

  }
  generateQRCodeBase64(qrData: string) {
    const qr = QRCode(0, 'L');
    qr.addData(qrData);
    qr.make();
    return qr.createDataURL(10, 0);
  }
}
