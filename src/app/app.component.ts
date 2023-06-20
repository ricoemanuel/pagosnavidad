import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'innovationhubes';
  user=localStorage.getItem("user")
  
  ngOnInit(): void {
    this.esAdmin()
  }
  constructor(private firebase:FirebaseService, private route:Router){
  }
  async esAdmin(){
    let user=await this.firebase.userObserver(this.user||'')
    let data:any=user.data()
    data.tipo==="admin"?localStorage.setItem("esAdmin","true"):localStorage.setItem("esAdmin","false")
  }
}
