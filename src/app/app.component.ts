import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { WompiService } from './services/wompi.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cargando: boolean = true
  login:boolean=false
  logged:boolean=false
  id: string | null;
  esAdmin:boolean=false
  constructor(private router: Router, private firebase: FirebaseService, private wompi: WompiService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
   }
  ngOnInit(): void {
    this.firebase.getAuthState().subscribe(async res => {
      if (res) {
        this.logged=true
        res.uid==="NNcOSeH29sRCTw7LDqOlthXdg8E3"?this.esAdmin=true:this.esAdmin=false
      }
      this.cargando = false
    })
    this.router.events.subscribe((event: any) => {
      if(event.url){
        if(event.url==='/login'){
          this.login=true
        }
        else{
          this.login=false
        }
      }


  });

  }
  logout() {
    this.firebase.cerrarSesion()
    this.logged=false
  }
  redirect(){
    this.router.navigate(['login'])
  }
  home(){
    this.router.navigate(['main'])
  }
  redirectW(){
    const urlWhatsApp = 'https://api.whatsapp.com/send?phone=573174236294';
    window.open(urlWhatsApp, '_blank');
  
  }

}
