import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  correo = ""
  contrasena = ""
  nombre=""
  cedula=""
  apellido=""
  iniciarSesion=true
  registrarse=false
  constructor(private router: Router, private loginservice: FirebaseService) { }
  async iniciar() {
    let email = this.correo
    let password = this.contrasena
    this.loginservice.login({ email, password }).then(usuario => {
      localStorage.setItem("login", "true")
      localStorage.setItem("user", usuario.user.uid)
      window.location.reload()
    }).catch(e => {
      if (e.code == "auth/invalid-email") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este email es inválido',

        })
      } else if (e.code == "auth/user-not-found") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este usuario no existe',

        })
      } else if (e.code == "auth/wrong-password") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La contraseña es incorrecta',

        })
      }
      

    })

  }
  switch(estado:string){
    if(estado==='registrarse'){
      this.iniciarSesion=false
      this.registrarse=true
      this.correo=""
      this.contrasena=""
    }
    if(estado==='iniciarSesion'){
      this.iniciarSesion=true
      this.registrarse=false
      this.contrasena=""
      this.correo=""
    }
  }
  registro(){
    this.loginservice.singup({email:this.correo,password:this.contrasena}).then(async res=>{
      let user=await this.loginservice.setUser({email:this.correo,nombre:this.nombre,apellido:this.apellido,cedula:this.cedula},res.user.uid)
    })
  }
}
