import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-formempresas',
  templateUrl: './formempresas.component.html',
  styleUrls: ['./formempresas.component.scss']
})
export class FormempresasComponent implements OnInit{
  createEmpresaGeneral: FormGroup;
  createEmpresaContacto: FormGroup;
  submitted = false;
  id: string | null;
  titulo = "Registrar empresa";
  esAdmin: any
  existeEmpresa:boolean=false
  fechaCreacion!:Date
  constructor(
    private fb: FormBuilder,
    private empresaservice: FirebaseService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createEmpresaGeneral = this.fb.group({
      nombre: ["", Validators.required],
      direccion: ["", Validators.required],
      nit: ["", Validators.required]
    });

    this.createEmpresaContacto = this.fb.group({
      email: ["", Validators.required],
      telefono: ["", Validators.required],
      ciudad: ["", Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit(): Promise<void> {
    this.esAdmin=await this.empresaservice.esAdmin()
    if(!this.esAdmin){
      this.router.navigate(["/clientes"])
    }
    this.esEmpresa();
  }

  

  setempresa() {
    const empresa: any = {
      nombre: this.createEmpresaGeneral.value.nombre,
      direccion: this.createEmpresaGeneral.value.direccion,
      nit: this.createEmpresaGeneral.value.nit,
      email: this.createEmpresaContacto.value.email,
      telefono: this.createEmpresaContacto.value.telefono,
      ciudad: this.createEmpresaContacto.value.ciudad,
      fechaCreacion: this.existeEmpresa?this.fechaCreacion:new Date(),
      fechaActualizacion: new Date()
    };

    this.empresaservice.setEmpresa(empresa)
      .then(() => {
        
        this.router.navigate(['/admin']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  esEmpresa() {

    if (this.id !== null) {
      this.existeEmpresa=true
      this.titulo = "Editar empresa";
      this.empresaservice.getEmpresa(this.id)
        .then((data:any) => {
          this.fechaCreacion=data.fechaCreacion
          if (data) {
            this.createEmpresaGeneral.patchValue({
              nombre: data.nombre,
              direccion: data.direccion,
              nit: data.nit
            });
            this.createEmpresaContacto.patchValue({
              email: data.email,
              telefono: data.telefono,
              ciudad: data.ciudad,
              
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}

