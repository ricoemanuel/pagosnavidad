import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  spinner: boolean = true
  correo = ""
  contrasena = ""
  nombre = ""
  cedula = ""
  apellido = ""
  iniciarSesion = false
  registrarse = true
  formularioSignUp = this.formBuilder.group({
    nombre: ['', Validators.required],
    tipoCedula: ['', Validators.required],
    cedula: ['', Validators.required],
    correo: ['', Validators.required],
    tipoRegistro: ['', Validators.required],
    contrasena: ['', Validators.required],
    confirmar: ['', Validators.required],
  });
  formularioLogin = this.formBuilder.group({
    correo: ['', Validators.required],
    contrasena: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder, private router: Router, private loginservice: FirebaseService) { }
  ngAfterViewInit(): void {
    this.spinner = false
  }

  async iniciar() {
    this.spinner = true
    let email = this.formularioLogin.value.correo
    let password = this.formularioLogin.value.contrasena
    this.loginservice.login({ email, password }).then(() => {
      this.spinner = false
    }).catch(e => {
      this.spinner = false
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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha sucedido un error desconocido, por favor comuníquese con nosotros.',
        })
      }


    })
  }
  switch(estado: string) {
    if (estado === 'registrarse') {
      this.iniciarSesion = false
      this.registrarse = true
      this.formularioLogin.reset()
    }
    if (estado === 'iniciarSesion') {
      this.iniciarSesion = true
      this.registrarse = false
      this.formularioSignUp.reset()
    }
  }
  registro() {
    if (this.formularioSignUp.valid) {
      if (this.formularioSignUp.value.contrasena === this.formularioSignUp.value.confirmar) {
        this.loginservice.singup({ email: this.formularioSignUp.value.correo, password: this.formularioSignUp.value.contrasena }).then(async res => {
          await this.loginservice.setUser(
            {
              email: this.formularioSignUp.value.correo,
              nombre: this.formularioSignUp.value.nombre,
              cedula: this.formularioSignUp.value.cedula,
              tipoRegistro: this.formularioSignUp.value.tipoRegistro,
              tipoCedula:this.formularioSignUp.value.tipoCedula
              
            }, res.user.uid)
        }).catch((error) => {
          console.log(error.code)
          if (error.code === 'auth/email-already-in-use') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Correo en uso.',
            })
          } else if (error.code === 'auth/invalid-email') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Correo inválido.',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha sucedido un error desconocido, por favor comuníquese con nosotros.',
            })
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debe confirmar las contraseñas.',
        })
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe llenar todos los campos',
      })
    }

  }
}
