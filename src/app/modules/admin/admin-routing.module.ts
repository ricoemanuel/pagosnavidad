import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormempresasComponent } from './components/formempresas/formempresas.component';
import { EmpresasListComponent } from './components/empresas-list/empresas-list.component';

const routes: Routes = [
  {
    path: '',
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
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
