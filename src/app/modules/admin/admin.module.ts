import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormempresasComponent } from './components/formempresas/formempresas.component';
import { AdminRoutingModule } from './admin-routing.module';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpresasListComponent } from './components/empresas-list/empresas-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RegistrarUsuariosComponent } from './components/registrar-usuarios/registrar-usuarios.component';
@NgModule({
  declarations: [
    FormempresasComponent,
    EmpresasListComponent,
    RegistrarUsuariosComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatStepperModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class AdminModule { }
