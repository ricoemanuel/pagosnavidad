import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { ClientesListaComponent } from './components/clientes-lista/clientes-lista.component';

//Components


const routes: Routes = [
  //{path:"", redirectTo: "app-login", pathMatch: "full"},
  {path:"clientes",component:ClientesListaComponent},
  {path:"registrarcliente",component:FormClientesComponent},
  {path:"login",component: LoginComponent},
  {path:"**",redirectTo: "clientes", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
