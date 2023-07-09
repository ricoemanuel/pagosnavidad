import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'innovationhubes';
  user: string | null = null
  load: boolean = false
  tamanoPantalla!: number
  developingMode: boolean = true
  constructor(
    private firebase: FirebaseService,
    private route: Router,
    private elementRef: ElementRef,
    private titleService: Title) {
    localStorage.setItem("registrando", "false")
  }
  async ngOnInit(): Promise<void> {
    await this.getUser()
    this.setTitle()
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
  setTitle() {
    this.firebase.getCurrentEmpresa().then(async res => {
      let empresa:any=await this.firebase.getEmpresa(res)
      this.titleService.setTitle(empresa.nombre)
    })
  }
  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
    if (!this.developingMode) {
      event.preventDefault();
    }
  }
  @HostListener('document:mouseleave', ['$event'])
  onDocumentMouseLeave(event: MouseEvent) {
    const isMouseOutside = !this.elementRef.nativeElement.contains(event.target as Node);
    if (isMouseOutside) {
      if (!this.developingMode) {
        window.location.href = "https://www.google.com/"
      }
    }
  }
}
