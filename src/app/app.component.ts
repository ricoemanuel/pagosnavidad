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
  constructor(private firebase: FirebaseService, private wompi: WompiService) { }
  ngOnInit(): void {

    this.firebase.getAuthState().subscribe(async res => {
      if (res) {
        let user = await this.firebase.getUser(res.uid)
        if (user) {
          this.iniciarSesion = false
        }
      } else {
        this.iniciarSesion = true
      }
    })
    
  }
  

}
