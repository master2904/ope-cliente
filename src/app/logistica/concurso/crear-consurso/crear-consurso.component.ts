import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConcursoService } from 'src/app/services/concurso.service';
import { formularioConcurso } from '../formularioConcurso';

@Component({
  selector: 'app-crear-consurso',
  templateUrl: './crear-consurso.component.html',
  styleUrls: ['./crear-consurso.component.scss']
})
export class CrearConsursoComponent implements OnInit {
  numero:any=/[0-9]+/;
  sigla:any=/[A-Za-z]{4}-[1-9]/;
  ges:any=/[I]+[/][2][0][0-9]{2}/;
  alfanumerico:any=/[A-Za-z1-9 ]{6,30}/;
  horas:any=/[0-9]+:[0-9]+/;
  g=new Date();
  minDate: Date;
  maxDate: Date;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      titulo:new FormControl('',[Validators.required,Validators.maxLength(30),Validators.minLength(6),Validators.pattern(this.alfanumerico)]),
      gestion:new FormControl('',[Validators.required,Validators.pattern(this.ges)]),
      fecha: new FormControl('',[Validators.required,Validators.min(this.g.getFullYear())]),
      hora: new FormControl('',[Validators.required,Validators.pattern(this.horas)]),
      imagen: new FormControl('',Validators.required),
      estado: new FormControl(''),
      img: new FormControl(''),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  file:File;
  nombre_i:string="";
  get titulo(){return this.agregar.get('titulo'); }
  get gestion(){return this.agregar.get('gestion'); }
  get fecha(){return this.agregar.get('fecha'); }
  get imagen(){return this.agregar.get('imagen'); }
  get hora(){return this.agregar.get('hora'); }
  get estado(){return this.agregar.get('estado'); }
  get f(){
    return this.agregar.controls;
  }
  settear(){
    this.agregar.reset({titulo:'',gestion:'',fecha:'',imagen:'',estado:''});
  }
  constructor(
    public dialogRef: MatDialogRef<CrearConsursoComponent>,@ Inject(MAT_DIALOG_DATA) public data: formularioConcurso,private concurso:ConcursoService) {
      this.agregar=this.createFormGroup();
      const currentYear = new Date().getFullYear();
      this.maxDate = new Date(currentYear + 1, 11, 31);
      this.minDate=this.g;
      // console.log(this.minDate);
    }
    cargarImagen(event){
      this.file=<File>event.target.files[0]
      const ext=this.file.name.split('.')[1];
      let fecha=new Date();
      this.nombre_i=""+fecha.getFullYear()+(fecha.getMonth()+1)+(fecha.getDay()+1)+fecha.getHours()+fecha.getMinutes()+fecha.getSeconds();
      this.nombre_i=this.nombre_i+"."+ext;
      console.log(this.nombre_i);
    }
    enviarImagen(){
      this.concurso.onUpload(this.file,this.nombre_i).subscribe(data=>{
        console.log(data);
      });
    }
  
    nuevo(){
      this.enviarImagen();
      this.agregar.controls['img'].setValue(this.nombre_i);
    }
    cancelar() {
      this.dialogRef.close();
    }
    error_titulo() {
      if (this.titulo.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      if(this.titulo.hasError('minLength'))
        return 'Ingrese minimo 6 caracteres';
      return this.titulo.hasError('pattern') ? 'Solo se aceptan letras y numeros con un minimo de 6 caracteres' : '';
    }
    error_gestion() {
      if (this.gestion.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      if(this.gestion.hasError('min'))
        return 'Ingrese minimo 3 caracteres';
      return this.gestion.hasError('pattern') ? 'Ingrese el formato indicado' : '';
    }
    error_fecha() {
      if (this.fecha.hasError('required')) {
        return 'Este campo es obligatorio';
      }
    }
    error_hora() {
      if (this.hora.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      if (this.hora.hasError('pattern') )
      return 'Ingrese el formato correcto';
    }
    error_estado() {
      if (this.estado.hasError('required')) {
        return 'Este campo es obligatorio';
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
