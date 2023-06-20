import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.scss']
})
export class EmpresasListComponent implements OnInit {
  empresas: any[] = [];
  esAdmin:boolean=localStorage.getItem("esAdmin")==="true"?true:false
  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
    if(!this.esAdmin){
      this.router.navigate(["/clientes"])
    }
    this.getEmpresas();
  }

  getEmpresas() {
    this.firebaseService.getEmpresas().subscribe(empresas => {
      this.empresas = empresas;
    });
  }

  editarEmpresa(empresa: any) {
    this.router.navigate(['/admin/editarempresa', empresa.id]);
  }

  agregarEmpresa() {
    // Lógica para agregar un nuevo cliente
    this.router.navigate(['/admin/registrarempresa']);
  }
  agregarUsuario(nit:string){
    
  }
}
