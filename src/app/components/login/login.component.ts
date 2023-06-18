import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  correo = ""
  contrasena = ""
  constructor(private router: Router, private firebase: FirebaseService) { }
  ngOnInit(): void {
    let user=localStorage.getItem("user")
    
    if(user!==null){
      this.router.navigate(["/clientes"])
    }
  }
  async iniciar() {
    let email = this.correo
    let password = this.contrasena
    this.firebase.login({ email, password }).then(usuario => {
      localStorage.setItem("login", "true")
      localStorage.setItem("user", usuario.user.uid)
      window.location.reload()
    }).catch(e => {
      console.log(e)
      if (e.code == "auth/invalid-email") {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Este email es inválido',

        // })
        console.log("1");
        
      } else if (e.code == "auth/user-not-found") {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Este usuario no existe',

        // })
        console.log("2");
        
      } else if (e.code == "auth/wrong-password") {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'La contraseña es incorrecta',

        // })
        console.log("3");
        
      }  
    })




  }
}