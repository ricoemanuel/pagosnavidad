import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { ClientesListaComponent } from './components/clientes-lista/clientes-lista.component';
import { ProductosListaComponent } from './components/productos-lista/productos-lista.component';
import { FormProductosComponent } from './components/form-productos/form-productos.component';

//Components
const routes: Routes = [
  { path: "", redirectTo: "clientes", pathMatch: "full" },
  { path: "clientes", component: ClientesListaComponent },
  { path: "registrarcliente", component: FormClientesComponent },
  { path: "editarcliente/:id", component: FormClientesComponent },
  { path: "productos", component: ProductosListaComponent },
  { path: "registrarproducto", component: FormProductosComponent },
  { path: "editarproducto/:id", component: FormProductosComponent },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "clientes", pathMatch: "full" },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
