import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { ClientesListaComponent } from './components/clientes-lista/clientes-lista.component';
import { ProductosListaComponent } from './components/productos-lista/productos-lista.component';
import { FormProductosComponent } from './components/form-productos/form-productos.component';
import { RegistrarVentaComponent } from './components/registrar-venta/registrar-venta.component';
import { ProveedoresListaComponent } from './components/proveedores-lista/proveedores-lista.component';
import { FormProveedoresComponent } from './components/form-proveedores/form-proveedores.component';
import { VentasListaComponent } from './components/ventas-lista/ventas-lista.component';

//Components
const routes: Routes = [
  
  { path: "clientes", component: ClientesListaComponent },
  { path: "registrarcliente", component: FormClientesComponent },
  { path: "editarcliente/:id", component: FormClientesComponent },
  { path: "productos", component: ProductosListaComponent },
  { path: "registrarproducto", component: FormProductosComponent },
  {path: "proveedores", component: ProveedoresListaComponent},
  {path: "editarproveedor/:id",component: FormProveedoresComponent},
  {path: "registrarproveedor",component: FormProveedoresComponent},
  {
    path:'admin',
    loadChildren: ()=>
      import('./modules/admin/admin.module').then((res)=> res.AdminModule)
  },
  { path: "editarproducto/:id", component: FormProductosComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "clientes", pathMatch: "full" },
  { path: "nuevaventa", component: RegistrarVentaComponent },
  { path: "ventas", component: VentasListaComponent },
  { path: "cartera/:id", component: VentasListaComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
