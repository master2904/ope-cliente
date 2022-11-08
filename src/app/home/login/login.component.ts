import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // public form={
  //   username:null,
  //   password:null
  // };
  error=null;
  rol=null
  nombre=null
  apellido=null
  email=null
  cuenta=null
  imagen=null
  fieldTextType=false
  agregar:FormGroup;
  createFormGroup(){
    return new FormGroup({
      username: new FormControl('',[Validators.required,Validators.minLength(4)]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    });
  }
  get username(){return this.agregar.get('username'); }
  get password(){return this.agregar.get('password'); }
  settear(){
    this.agregar.reset({username:'',password:''});
  }
  get f(){
    return this.agregar.controls;
  }  
  
  error_cuenta(){
    if(this.username.hasError('required'))
      return 'Campo Obligatorio';
    if(this.username.hasError('minlength'))
      return 'Ingrese minimo 4 caracteres ';
      if(this.username.hasError('pattern'))
      return 'Ingrese letras y/o numeros';    
  }
  error_clave(){
    if(this.password.hasError('required'))
      return 'Campo Obligatorio';
    if(this.password.hasError('minlength'))
      return 'Ingrese minimo 8 caracteres ';
  }
  onLogin(){
    let form=this.agregar.value;  
    this.auth.login(form).subscribe(
      data=>{        
        // console.log(data);
        this.toastr.success("Haz iniciado Sesion",'En hora buena!');
        const user=data['user'];
        this.rol=user.rol;
        this.nombre=user.nombre;
        this.apellido=user.apellido;
        this.email=user.email;
        this.cuenta=user.username;
        this.imagen=environment.base+'usuario/imagen/'+user.imagen;
        // environment.imagen+'usuario/'
        localStorage.setItem('rol',this.rol);
        localStorage.setItem('nombre',this.nombre);
        localStorage.setItem('apellido',this.apellido);
        localStorage.setItem('imagen',this.imagen);
        localStorage.setItem('email',this.email);
        localStorage.setItem('cuenta',this.cuenta);
        switch(this.rol){
          case 1:
            this.route.navigate(["/admin"]);break;
          case 2:
            this.route.navigateByUrl("/logistica");break;
          case 3:
            this.route.navigateByUrl("/staff");break;
          default:
            this.route.navigateByUrl("/home/login");break;
        }
      },
      error=>{
        this.error=error.status;
        if(this.error==500)
          this.toastr.error("Revise su conexión","Error");
        else
          if(this.error==400)
            this.toastr.error("Cuenta o clave incorrecto","Error");
      });
  }
  constructor(private http:HttpClient, private toastr: ToastrService,private route:Router, private auth:AuthService) { 
    this.agregar=this.createFormGroup();
  } 
  ngOnInit(): void {
    
  }

}
