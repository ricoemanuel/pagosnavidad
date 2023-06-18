import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss']
})
export class ClientesListaComponent {
  constructor(private router: Router) { }
  clientes = [
    { nombre: 'Juan', apellido: 'Pérez', id: 1 },
    { nombre: 'María', apellido: 'González', id: 2 },
    { nombre: 'Carlos', apellido: 'López', id: 3 }
  ];

  editarCliente(cliente: any) {
    // Lógica para editar el cliente
  }

  eliminarCliente(cliente: any) {
    // Lógica para eliminar el cliente
  }

  agregarCliente() {
    // Lógica para agregar un nuevo cliente
    this.router.navigate(['/app-form-clientes']);
  }
}
