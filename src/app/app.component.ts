import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'innovationhubes';
  user: string | null = null
  load: boolean = false
  constructor(private firebase: FirebaseService, private route: Router) {
    localStorage.setItem("registrando","false")
  }
  async ngOnInit(): Promise<void> {

    await this.getUser()
    setTimeout(() => {
      this.load = true; // Ocultar el indicador de carga
    }, 1500);

  }
  async getUser() {
    this.firebase.getAuthState().subscribe(res => {
      if (res) {
        this.user = res.uid
        let currentUser = localStorage.getItem("currentUser")
        if (currentUser === null) {
          this.firebase.cerrarSesion()
          this.user = null
        }
      }
    })
  }
}
