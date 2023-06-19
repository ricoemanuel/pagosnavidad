import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { LoginComponent } from './components/login/login.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientesListaComponent } from './components/clientes-lista/clientes-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { FormProductosComponent } from './components/form-productos/form-productos.component';
import { ProductosListaComponent } from './components/productos-lista/productos-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormClientesComponent,
    NavbarComponent,
    ClientesListaComponent,
    FormProductosComponent,
    ProductosListaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatStepperModule,
    MatInputModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
