import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

export interface Empresa {
  nit: string;
  nombre: string;
  ciudad: string;
  email: string;
  fechaActualizacion:Date,
  fechaCreacion:Date,
  telefono:string
}

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.scss']
})
export class EmpresasListComponent implements OnInit,AfterViewInit {
  
  dataSource: MatTableDataSource<Empresa>;
  displayedColumns: string[] = ['nit', 'nombre', 'ciudad', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  esAdmin: any
  

  constructor(private firebaseService: FirebaseService,private router: Router) {
    this.dataSource = new MatTableDataSource<Empresa>();
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.esAdmin=await this.firebaseService.esAdmin()
    if(!this.esAdmin){
      this.router.navigate(["/clientes"])
    }
    this.getEmpresas();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }
  getEmpresas() {
    this.firebaseService.getEmpresas().subscribe(empresas => {
      this.dataSource.data = empresas;
      
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editarEmpresa(cliente: any) {
    this.router.navigate(['/admin/editarempresa', cliente.id]);
  }
  agregarUsuario(cliente: any) {
    this.router.navigate(['/admin/crearUsuario', cliente.id]);
  }
}
