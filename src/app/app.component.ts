import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.user);
    if(this.user===null){
      this.route.navigate(["/login"])
    }else{
      this.route.navigate(['/clientes'])
    }
    
  }
  constructor(private firebase:FirebaseService, private route:Router){
  }
  title = 'innovationhubes';
  user=localStorage.getItem("user")
}
