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
  g=new Date();
  minDate: Date;
  maxDate: Date;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      titulo:new FormControl('',[Validators.required,Validators.maxLength(30),Validators.minLength(8)]),
      fecha: new FormControl('',[Validators.required,Validators.min(this.g.getFullYear())]),
      hora: new FormControl('',[Validators.required]),
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
  get fecha(){return this.agregar.get('fecha'); }
  get imagen(){return this.agregar.get('imagen'); }
  get hora(){return this.agregar.get('hora'); }
  get estado(){return this.agregar.get('estado'); }
  get f(){
    return this.agregar.controls;
  }
  settear(){
    this.agregar.reset({titulo:'',fecha:'',imagen:'',estado:''});
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
      if (this.titulo.hasError('minlength')) 
        return 'Ingrese minimo 8 caracteres';
      return this.titulo.hasError('pattern') ? 'Ingrese Letras y/o numeros' : '';
    }
    error_fecha() {
      if (this.fecha.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      if(this.fecha.value<this.g){
      // if(this.fecha.hasError('actual')){
        return 'Fecha pasada';
      }
    }
    error_hora() {
      if (this.hora.hasError('required')) {
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
