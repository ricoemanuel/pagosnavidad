import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoComponent } from './components/evento/evento.component';
import { LoginComponent } from './components/login/login.component';
import { MisComprasComponent } from './components/mis-compras/mis-compras.component';
import { MainComponent } from './components/main/main.component';
import { AdminComponent } from './components/admin/admin.component';
import { EventoAdminComponent } from './components/evento-admin/evento-admin.component';


//Components
const routes: Routes = [
  {path:'evento/:id',component:EventoComponent},
  {path:'login',component:LoginComponent},
  {path:'mis-compras',component:MisComprasComponent},
  {path:'main',component:MainComponent},
  {path:'ventas',component:AdminComponent},
  {path:'evento-admin/:id',component:EventoAdminComponent},
  {
    path: '**', // El wildcard '**' atrapa cualquier ruta que no coincida con las rutas anteriores
    redirectTo: '/main', // Redirige a la ruta deseada
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
