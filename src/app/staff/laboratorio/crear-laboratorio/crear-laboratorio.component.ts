import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import { Formulario } from '../formulario';

@Component({
  selector: 'app-crear-laboratorio',
  templateUrl: './crear-laboratorio.component.html',
  styleUrls: ['./crear-laboratorio.component.scss']
})
export class CrearLaboratorioComponent implements OnInit {
  numero:any=/[0-9]+/;
  sigla:any=/[Ll][Ss][Ii][A-Za-z]-[1-9]/;
  letras:any=/[A-Za-z ]{8,30}/;
  file:File=null;
  nombre=null;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      aula:new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern(this.sigla)]),
      jefe_labo:new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(this.letras)]),
      maquinas: new FormControl('',[Validators.required,Validators.min(10),Validators.max(40)]),
      columnas: new FormControl('',[Validators.required,Validators.min(3),Validators.max(6)]),
      imagen: new FormControl('',Validators.required),
      img: new FormControl(''),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get aula(){return this.agregar.get('aula'); }
  get jefe_labo(){return this.agregar.get('jefe_labo'); }
  get maquinas(){return this.agregar.get('maquinas'); }
  get columnas(){return this.agregar.get('columnas'); }
  get imagen(){return this.agregar.get('imagen'); }
  get f(){
    return this.agregar.controls;
  }
  settear(){
    this.agregar.reset({aula:'',maquinas:'',columnas:'',jefe_labo:'',imagen:''});
  }
  cargarImagen(event){
    this.file=<File>event.target.files[0]
    const ext=this.file.name.split('.')[1];
    let fecha=new Date();  
    this.nombre=""+fecha.getFullYear()+(fecha.getMonth()+1)+(fecha.getDay()+1)+fecha.getHours()+fecha.getMinutes()+fecha.getSeconds();
    this.nombre=this.nombre+"."+ext;
    console.log(this.nombre);
  }
  enviarImagen(){
    this.labo.onUpload(this.file,this.nombre).subscribe(data=>{
      console.log(data);
    },
    error=>{
      console.log(<any>error);
    }); 
  }
  constructor(
    public dialogRef: MatDialogRef<CrearLaboratorioComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Formulario,private labo:LaboratorioService) {
    this.agregar=this.createFormGroup();
  }
  nuevo(){
    this.enviarImagen();
    this.agregar.controls['img'].setValue(this.nombre);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_aula() {
    if (this.aula.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.aula.hasError('minLength'))
      return 'Ingrese minimo 6 caracteres';
    return this.aula.hasError('pattern') ? 'Ingrese el formato indicado' : '';
  }
  error_jefe_labo() {
    if (this.jefe_labo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.jefe_labo.hasError('minLength'))
      return 'Ingrese minimo 6 caracteres';
    return this.jefe_labo.hasError('pattern') ? 'Solo se aceptan letras con un minimo de 8 caracteres' : '';
  }
  error_maquinas() {
    if (this.maquinas.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (this.maquinas.hasError('min')) {
      return 'Ingrese minimo 10 maquinas';
    }
    if (this.maquinas.hasError('max')) {
      return 'Ingrese maximo 60 maquinas';
    }
  }
  error_columnas() {
    if (this.columnas.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (this.columnas.hasError('min')) {
      return 'Ingrese minimo 3 columnas';
    }
    if (this.columnas.hasError('max')) {
      return 'Ingrese maximo 6 columnas';
    }
  }
  error_imagen() {
    if (this.imagen.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return "";
  }
  ngOnInit(): void {
  }
}
