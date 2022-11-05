import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public nombre=null;
  constructor(private app:AppComponent,private auth:AuthService) { }
  ngOnInit():void{
    // console.log("usuario");
    // this.getUserLogged();
  }
  getUserLogged() {
    // this.auth.getUser().subscribe(user => {
      // console.log(user);
    // });
  }
}
