import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.scss']
})
export class RegistrarUsuariosComponent {
  createUsuarioPersonal: FormGroup;
  createUsuarioContacto: FormGroup;
  currentUser:any = JSON.parse(localStorage.getItem("currentUser") || '')
    
  submitted = false;
  id: string | null;
  cedula: string | null;
  titulo = "Registrar Usuario";
  esAdmin: Promise<boolean> = this._UsuarioService.esAdmin()
  constructor(
    private fb: FormBuilder,
    private _UsuarioService: FirebaseService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createUsuarioPersonal = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      nit: ["", Validators.required],
      tipo: ["", Validators.required]
    });

    this.createUsuarioContacto = this.fb.group({
      email: ["", Validators.required],
      telefono: ["", Validators.required],
      direccion: ["", Validators.required]
    });

   

    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.cedula = this.aRoute.snapshot.paramMap.get('cedula');
    
  }

  async ngOnInit(): Promise<void> {
    
    if(await !this.esAdmin){
      this.router.navigate(["/Usuarios"])
    }
    this.esUsuario();
  }

  addEditarUsuario() {
    this.submitted = true;

    if (this.createUsuarioPersonal.invalid || this.createUsuarioContacto.invalid) {
      return;
    }

    if (this.cedula === null) {
      this.addUsuario();
    } else {
      this.editarUsuario(this.cedula);
    }
  }

  async addUsuario() {
    
    const Usuario: any = {
      nombre: this.createUsuarioPersonal.value.nombre,
      apellido: this.createUsuarioPersonal.value.apellido,
      email: this.createUsuarioContacto.value.email,
      nit: this.createUsuarioPersonal.value.nit,
      telefono: this.createUsuarioContacto.value.telefono,
      direccion: this.createUsuarioContacto.value.direccion,
      empresa:this.id,
      tipo:this.createUsuarioPersonal.value.tipo,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    
    let password="2123123"+Usuario.nombre+Usuario.apellido+"$$"
    let email=Usuario.email
    localStorage.setItem("registrando","true")
    let user=await this._UsuarioService.singup({email,password})
    await this._UsuarioService.login(this.currentUser)
    localStorage.setItem("registrando","false")
    let id=user.user.uid
    
    this._UsuarioService.SetUsuario(id,Usuario)
      .then(() => {
        this.router.navigate(['/admin']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  esUsuario() {
    if (this.id !== null) {
      this.titulo = "Editar Usuario";

      this._UsuarioService.getUsuario(this.id)
        .then(data => {
          if (data) {
            this.createUsuarioPersonal.patchValue({
              nombre: data['nombre'],
              apellido: data['apellido'],
              nit: data['nit']
            });

            this.createUsuarioContacto.patchValue({
              email: data['email'],
              telefono: data['telefono'],
              
              direccion: data['direccion']
            });

           
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  editarUsuario(id: string) {
    const Usuario: any = {
      nombre: this.createUsuarioPersonal.value.nombre,
      apellido: this.createUsuarioPersonal.value.apellido,
      nit: this.createUsuarioPersonal.value.nit,
      telefono: this.createUsuarioContacto.value.telefono,
      direccion: this.createUsuarioContacto.value.direccion,
      fechaActualizacion: new Date()
    };

    this._UsuarioService.actualizarEmpleado(id, Usuario)
      .then(() => {
        this.router.navigate(['/Usuarios']);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
