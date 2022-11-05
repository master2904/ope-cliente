import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProblemaService } from 'src/app/services/problema.service';
import { FormularioProblema } from '../formulario-problema';

@Component({
  selector: 'app-crear-problema',
  templateUrl: './crear-problema.component.html',
  styleUrls: ['./crear-problema.component.scss']
})
export class CrearProblemaComponent implements OnInit {
  numero:any=/[0-9]+/;
  sigla:any=/[A-Z1-9]/;
  alfabeto:any=/[A-Za-z0-9 ]{5,30}/;
  letras:any=/[A-Za-z ]{5,30}/;
  file:File=null;
  nombre=null;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      alias:new FormControl('',[Validators.required,Validators.minLength(1),Validators.pattern(this.sigla)]),
      titulo:new FormControl('',[Validators.required,Validators.pattern(this.alfabeto)]),
      id_categoria: new FormControl('',),
      dificultad: new FormControl('',[Validators.required]),
      autor: new FormControl('',[Validators.required,Validators.pattern(this.letras)]),
      color: new FormControl('',Validators.required),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get alias(){return this.agregar.get('alias'); }
  get titulo(){return this.agregar.get('titulo'); }
  get id_categoria(){return this.agregar.get('id_categoria'); }
  get dificultad(){return this.agregar.get('dificultad'); }
  get autor(){return this.agregar.get('autor'); }
  get color(){return this.agregar.get('color'); }
  get f(){
    return this.agregar.controls;
  }
  cargarArchivo(event){
    this.file=<File>event.target.files[0]
    const ext=this.file.name.split('.')[1];
    let fecha=new Date();  
    this.nombre=""+fecha.getFullYear()+(fecha.getMonth()+1)+(fecha.getDay()+1)+fecha.getHours()+fecha.getMinutes()+fecha.getSeconds();
    this.nombre=this.nombre+"."+ext;
    console.log(this.nombre);
  }
  enviarArchivo(){
    this.problema.onUpload(this.file,this.nombre).subscribe(data=>{
      console.log(data);
    },
    error=>{
      console.log(<any>error);
    }); 
  }
  constructor(
    public dialogRef: MatDialogRef<CrearProblemaComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: FormularioProblema,private problema:ProblemaService) {
    this.agregar=this.createFormGroup();
  }
  nuevo(){
    // this.enviarArchivo();
    // this.agregar.controls['img'].setValue(this.nombre);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_alias() {
    if (this.alias.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.alias.hasError('minLength'))
      return 'minom 3 letras';
    if(this.alias.hasError('pattern'))
      return 'Ingrese el formato indicado';
  }
  error_titulo() {
    if (this.titulo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.titulo.hasError('pattern'))
      return 'Solo se aceptan letras y numeros, con minimo de 5 caracteres';
  }
  error_dificultad() {
    if (this.dificultad.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  error_autor() {
    if (this.autor.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.autor.hasError('pattern'))
      return 'Solo se aceptan letras, con minimo de 5 caracteres';
  }
  error_color() {
    if (this.color.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return "";
  }
  ngOnInit(): void {
  }
}
