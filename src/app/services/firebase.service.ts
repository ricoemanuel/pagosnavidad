import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from '@angular/fire/firestore';
import { Observable, from, map, switchMap } from 'rxjs';

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
  actualizarAsiento(asiento: any) {
    const entradaRef = doc(this.firestore, "asientos", `f${asiento.fila}c${asiento.columna}-${asiento.evento}`)
    setDoc(entradaRef, asiento)
  }

}
