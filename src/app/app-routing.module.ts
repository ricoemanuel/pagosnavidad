import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoComponent } from './components/evento/evento.component';
import { LoginComponent } from './components/login/login.component';


//Components
const routes: Routes = [
  {path:'evento/:id',component:EventoComponent},
  {path:'login',component:LoginComponent},
  {
    path: '**', // El wildcard '**' atrapa cualquier ruta que no coincida con las rutas anteriores
    redirectTo: '/evento/0pRlSIWu9Cxyv7X8s8TQ', // Redirige a la ruta deseada
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
