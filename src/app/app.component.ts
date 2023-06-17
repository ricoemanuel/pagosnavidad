import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.firebase.userObserver())
    console.log(localStorage.getItem("user"));
    
  }
  constructor(private firebase:FirebaseService){}
  title = 'innovationhubes';
}
