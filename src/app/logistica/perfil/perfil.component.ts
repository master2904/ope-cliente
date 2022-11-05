import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor() { }
  getrol(){
    const rol=localStorage.getItem('rol');
    if(rol==="1")
      return "Administrador";
    if(rol==="2")
      return "Usuario";
    if(rol==="3")
      return "Staff";
    return "";
  }
  nombre(){
    return localStorage.getItem('nombre');
  }
  apellido(){
    return localStorage.getItem('apellido');
  }
  email(){
    return localStorage.getItem('email');
  }
  cuenta(){
    return localStorage.getItem('cuenta');
  }
  imagen(){
    return localStorage.getItem('imagen');
  }
  
  ngOnInit(): void {
  }

}
