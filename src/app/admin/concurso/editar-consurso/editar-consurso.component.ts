import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { image } from 'html2canvas/dist/types/css/types/image';
import { ConcursoService } from 'src/app/services/concurso.service';
import { formularioConcurso } from '../formularioConcurso';

@Component({
  selector: 'app-editar-consurso',
  templateUrl: './editar-consurso.component.html',
  styleUrls: ['./editar-consurso.component.scss']
})
export class EditarConsursoComponent implements OnInit {
  numero:any=/[0-9]+/;
  g=new Date();
  minDate: Date;
  maxDate: Date;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      titulo:new FormControl('',[Validators.required,Validators.minLength(6)]),
      // fecha: new FormControl('',[Validators.required]),
      fecha: new FormControl('',[Validators.required,Validators.min(this.g.getFullYear())]),
      hora: new FormControl('',[Validators.required]),
      imagen: new FormControl(''),
      estado: new FormControl(''),
      img: new FormControl(''),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  formulario:FormGroup;
  file:File;
  nombre_i:string="";
  get titulo(){return this.formulario.get('titulo'); }
  get gestion(){return this.formulario.get('gestion'); }
  get fecha(){return this.formulario.get('fecha'); }
  get imagen(){return this.formulario.get('imagen'); }
  get hora(){return this.formulario.get('hora'); }
  get estado(){return this.formulario.get('estado'); }
  get f(){
    return this.formulario.controls;
  }
  settear(){
    this.formulario.reset({titulo:'',gestion:'',fecha:'',imagen:''});
  }
  constructor(
    public dialogRef: MatDialogRef<EditarConsursoComponent>,@ Inject(MAT_DIALOG_DATA) public data: formularioConcurso,private concurso:ConcursoService) {
      this.formulario=this.createFormGroup();
      // console.log(data)
      const currentYear = new Date().getFullYear();
      this.maxDate = new Date(currentYear + 1, 11, 31);
      this.minDate=this.g;
      this.formulario.controls['id'].setValue(data.id);
      this.formulario.controls['titulo'].setValue(data.titulo);
      this.formulario.controls['fecha'].setValue(data.fecha);
      this.formulario.controls['hora'].setValue(data.hora);
      this.formulario.controls['estado'].setValue(data.estado);
      this.formulario.controls['imagen'].setValue("");
      this.formulario.controls['img'].setValue("");
      // this.formulario.controls['estado'].setValue(data.estado);
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
  
    editar(){
      if(this.imagen.value!=""){
        this.enviarImagen();
        this.formulario.controls['img'].setValue(this.nombre_i);
      }
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
