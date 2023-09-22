import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { WompiService } from './services/wompi.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  iniciarSesion: boolean = true;
  cargando:boolean=true
  constructor(private router: Router,private firebase: FirebaseService, private wompi: WompiService) { }
  ngOnInit(): void {
    this.router.navigate(['evento', '0pRlSIWu9Cxyv7X8s8TQ'])
    this.firebase.getAuthState().subscribe(async res => {
      if (res) {
        let user = await this.firebase.getUser(res.uid)
        if (user) {
          this.iniciarSesion = false
          this.cargando=false
        }
      } else {
        this.iniciarSesion = true
        this.cargando=false
      }
    })
    
  }
  logout(){
    this.firebase.cerrarSesion()
  }
  
 

}
