import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
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
  esAdmin: Promise<boolean> = this.firebase.esAdmin()
  constructor(private router: Router, private firebase: FirebaseService) { }
  ngOnInit(): void {
    this.firebase.getAuthState().subscribe(async res=>{
      if(res){
        if(await this.esAdmin){
          this.router.navigate(["/admin"])
        }else{
          this.router.navigate(["/clientes"])
        }
      }else{
        localStorage.clear()
      }
    })
  }
  async iniciar() {
    let email = this.correo
    let password = this.contrasena
    let userObj={email,password}
    localStorage.setItem("currentUser",JSON.stringify(userObj))
    this.firebase.login(userObj).then(usuario => {
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