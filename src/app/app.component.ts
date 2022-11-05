import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AdminModule } from './admin/admin.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  })
export class AppComponent implements OnInit{
  public rol = null;
  nombre=null;
  // constructor(private perfil:PerfilComponent){  }
  constructor(private router:Router, private toastr:ToastrService){
  }
  role(){
    const token= localStorage.getItem('token-ope');
    if(token){
      let payload:string = token.split('.')[1];
      const value =atob(payload);
      const json=JSON.parse(value);
      const now=Math.floor(Date.now()/1000);
      if(json.exp<now){
        this.toastr.warning('Expiro su tiempo de Sesion','Atencion');
        localStorage.removeItem('token-ope');
        localStorage.removeItem('rol');
        this.router.navigateByUrl("/home");
        return null;
      }
      else{ 
        this.rol=localStorage.getItem('rol');
        return this.rol;
      }
    }
    else
      return null;
  }
  ngOnInit():void{
    if(!localStorage.getItem('token-ope')){
      localStorage.removeItem('rol');
      this.rol=0;
    } 
  }
}