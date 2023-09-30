import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoComponent } from './components/evento/evento.component';
import { LoginComponent } from './components/login/login.component';
import { MisComprasComponent } from './components/mis-compras/mis-compras.component';


//Components
const routes: Routes = [
  {path:'evento/:id',component:EventoComponent},
  {path:'login',component:LoginComponent},
  {path:'mis-compras',component:MisComprasComponent},
  {
    path: '**', // El wildcard '**' atrapa cualquier ruta que no coincida con las rutas anteriores
    redirectTo: '/evento/Mu5vLrRQqVJ8Su9wjpHW', // Redirige a la ruta deseada
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
