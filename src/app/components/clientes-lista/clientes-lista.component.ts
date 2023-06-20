import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss']
})
export class ClientesListaComponent implements OnInit {
  clientes: any[] = [];
  esAdmin:boolean=localStorage.getItem("esAdmin")==="true"?true:false
  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
    if(this.esAdmin){
      this.router.navigate(["/admin"])
    }
    this.getClientes();
  }

  getClientes() {
    this.firebaseService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  editarCliente(cliente: any) {
    this.router.navigate(['/editarcliente', cliente.id]);
  }

  eliminarCliente(cliente: any) {
    const nit = cliente.id; 
    this.firebaseService.eliminarCliente(nit).then(() => {
      this.getClientes();
    }).catch(error => {
      console.log('Error al eliminar el cliente:', error);
    });
  }
  agregarCliente() {
    // Lógica para agregar un nuevo cliente
    this.router.navigate(['/registrarcliente']);
  }
}
