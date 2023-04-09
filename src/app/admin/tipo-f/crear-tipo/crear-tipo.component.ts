import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TipoService } from 'src/app/services/tipo.service';
import { Formulario } from '../formulario';

@Component({
  selector: 'app-crear-tipo',
  templateUrl: './crear-tipo.component.html',
  styleUrls: ['./crear-tipo.component.scss']
})
export class CrearTipoComponent implements OnInit {
  letras:any=/[A-Za-z 0-9]{3,20}/;
  agregar:FormGroup;
  file:File=null;
  nombre_i:string=null;
  form:Formulario;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      descripcion:new FormControl('',[Validators.required,Validators.pattern(this.letras)]),
      id_producto: new FormControl('',[]),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  get descripcion(){return this.agregar.get('descripcion'); }
  get id_producto(){return this.agregar.get('id_producto'); }
  settear(){
    this.agregar.reset({descripcion:'',id_producto:''});
  }
  get f(){
    return this.agregar.controls;
  }  
  constructor(
    public dialogRef: MatDialogRef<CrearTipoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Formulario,private tipo:TipoService,private toastr:ToastrService) {
      this.agregar=this.createFormGroup();

    }
  ngOnInit(): void {
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_descripcion() {
    if (this.descripcion.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.descripcion.hasError('pattern'))
      return  'Solo se aceptan letras y numeros';
      return  '';
  }
  nuevo(){
    // this.dialogRef.close();
  }
}
