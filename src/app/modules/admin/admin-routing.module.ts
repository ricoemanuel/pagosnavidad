import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormempresasComponent } from './components/formempresas/formempresas.component';
import { EmpresasListComponent } from './components/empresas-list/empresas-list.component';
import { RegistrarUsuariosComponent } from './components/registrar-usuarios/registrar-usuarios.component';

const routes: Routes = [
  {
    path: 'empresas',
    component:EmpresasListComponent
  },
  {
    path: 'registrarempresa',
    component:FormempresasComponent
  },
  {
    path: 'editarempresa/:id',
    component:FormempresasComponent
  },
  {
    path: 'crearUsuario/:id',
    component:RegistrarUsuariosComponent
  },
  { path: "", redirectTo: "empresas", pathMatch: "full" },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
