import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

export interface Proveedor {
  nit: string;
  nombre: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

@Component({
  selector: 'app-proveedores-lista',
  templateUrl: './proveedores-lista.component.html',
  styleUrls: ['./proveedores-lista.component.scss']
})
export class ProveedoresListaComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Proveedor>;
  displayedColumns: string[] = ['nit', 'nombre', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  esAdmin: any;
  @Input() showconfig!: string;
  @Output() myEvent = new EventEmitter();
  cantidad = new FormControl();

  constructor(private router: Router, private firebaseService: FirebaseService) {
    this.dataSource = new MatTableDataSource<Proveedor>();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
    this.esAdmin = await this.firebaseService.esAdmin();
    if (this.esAdmin) {
      this.router.navigate(['/admin']);
    }
    this.getProveedores();
    if (this.showconfig) {
      console.log(this.showconfig);
      this.displayedColumns = ['nit', 'nombre', 'acciones'];
    }
  }

  getProveedores() {
    this.firebaseService.getProveedoresByEmpresa().subscribe(proveedores => {
      this.dataSource.data = proveedores;
    });
  }

  editarProveedor(proveedor: any) {
    this.router.navigate(['/editarproveedor', proveedor.id]);
  }

  eliminarProveedor(proveedor: any) {
    const id = proveedor.id;
    this.firebaseService.eliminarProveedor(id).then(() => {
      this.getProveedores();
    }).catch(error => {
      console.log('Error al eliminar el proveedor:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  emitProveedor(proveedor: any) {
    // Puedes agregar lógica aquí si es necesario para manejar la emisión del proveedor.
    // Por ejemplo, pasar la cantidad, si es requerido.
    let cantidad = this.cantidad.value;
    this.myEvent.emit({ proveedor, cantidad });
  }
}
