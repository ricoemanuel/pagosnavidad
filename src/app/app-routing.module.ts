import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';

//Components


const routes: Routes = [
  {path:"", redirectTo: "app-login", pathMatch: "full"},
  {path:"login",component: LoginComponent},
  {path:"app-form-clientes",component:FormClientesComponent},
  {path:"**",redirectTo: "login", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
