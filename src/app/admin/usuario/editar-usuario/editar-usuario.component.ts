import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Formulario } from '../formulario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  numero:any=/[0-9]+/;
  user:any=/[A-Za-z0-9]/;
  letras:any=/[A-Za-z]/;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      nombre:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern(this.letras)]),
      apellido:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30),Validators.pattern(this.letras)]),
      username: new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(this.user)]),
      rol: new FormControl('',[Validators.required]),
      img: new FormControl(''),
      imagen: new FormControl('',[]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  formulario:FormGroup;
  get nombre(){return this.formulario.get('nombre'); }
  get apellido(){return this.formulario.get('apellido'); }
  get username(){return this.formulario.get('username'); }
  get imagen(){return this.formulario.get('imagen'); }
  get rol(){return this.formulario.get('rol'); }
  get email(){return this.formulario.get('email'); }
  get password(){return this.formulario.get('password'); }
  constructor(  public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Formulario,private usuario:UsuarioService,){
    this.formulario=this.createFormGroup();
    this.formulario.controls['id'].setValue(data.id);
    this.formulario.controls['nombre'].setValue(data.nombre);
    this.formulario.controls['apellido'].setValue(data.apellido);
    this.formulario.controls['email'].setValue(data.email);
    this.formulario.controls['username'].setValue(data.username);
    this.formulario.controls['rol'].setValue(data.rol);
    this.formulario.controls['imagen'].setValue("");
    this.formulario.controls['img'].setValue("");
   }
   file:File;
   nombre_i=null;
   cargarImagen(event){
    this.file=<File>event.target.files[0]
    const ext=this.file.name.split('.')[1];
    let fecha=new Date();
    this.nombre_i=""+fecha.getFullYear()+(fecha.getMonth()+1)+(fecha.getDay()+1)+fecha.getHours()+fecha.getMinutes()+fecha.getSeconds();
    // this.nombre_i=this.username;
    this.nombre_i=this.nombre_i+"."+ext;
    console.log(this.nombre_i);
  }
  enviarImagen(){
    this.usuario.onUpload(this.file,this.nombre_i).subscribe(data=>{
      console.log(data);
    },
    error=>{
      console.log(<any>error);
    }); 
  }

  cambiar(){
    if(this.imagen.value!=""){
      this.enviarImagen();
      this.formulario.controls['img'].setValue(this.nombre_i);
    }
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_nombre() {
    if (this.nombre.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nombre.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.nombre.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }
  error_apellido() {
    if (this.apellido.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.apellido.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    return this.apellido.hasError('pattern') ? 'Solo se aceptan letras' : '';
  }
  error_username() {
    if (this.username.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.username.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    return this.username.hasError('pattern') ? 'Solo se aceptan numeros y letras' : '';
  }
  error_rol() {
    if (this.rol.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  error_imagen() {
    if (this.imagen.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return "";
  }
  error_email() {
    if (this.email.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.email.hasError('email'))
      return 'Ingrese un correo valido';
  }
  error_password() {
    if (this.password.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.password.hasError('minlength'))
      return 'Clave con minimo 8 caracteres';
  }
  ngOnInit(): void {
    
  }
}