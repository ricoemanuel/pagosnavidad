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

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.firebaseService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  editarCliente(cliente: any) {
    // Lógica para editar el cliente
  }

  eliminarCliente(cliente: any) {
    // Lógica para eliminar el cliente
  }

  agregarCliente() {
    // Lógica para agregar un nuevo cliente
    this.router.navigate(['/registrarcliente']);
  }
}
