import { Component, OnInit } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private toastr:ToastrModule) { }

  ngOnInit(): void {
  }
  nombre(){
    return localStorage.getItem('nombre');
  }
  email(){
    return localStorage.getItem('email');
  }
  imagen(){
    return localStorage.getItem('imagen');
  }
}
