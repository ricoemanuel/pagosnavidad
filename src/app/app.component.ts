import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges{
  title = 'innovationhubes';
  user:string|null=null
  load:boolean=false
  ngOnChanges(changes: SimpleChanges) {
    alert(true)
  }
  ngOnInit(): void {
    
    this.getUser()
    setTimeout(() => {
      this.load = true; // Ocultar el indicador de carga
    }, 1500);
  }
  constructor(private firebase:FirebaseService, private route:Router){
  }
  async getUser(){
    this.firebase.getAuthState().subscribe(res=>{
      if(res){
        this.user=res.uid
        
      }
    })
  }
}
