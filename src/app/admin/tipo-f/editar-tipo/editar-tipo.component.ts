import { Formulario } from '../formulario';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TipoService } from 'src/app/services/tipo.service';
@Component({
  selector: 'app-editar-tipo',
  templateUrl: './editar-tipo.component.html',
  styleUrls: ['./editar-tipo.component.scss']
})
export class EditarTipoComponent implements OnInit {
  letras:any=/[A-Za-z ]{3,20}/;
  formulario:FormGroup;
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
  get descripcion(){return this.formulario.get('descripcion'); }
  get id_producto(){return this.formulario.get('id_producto'); }
  settear(){
    this.formulario.reset({descripcion:'',id_producto:''});
  }
  get f(){
    return this.formulario.controls;
  }  
  constructor(
    public dialogRef: MatDialogRef<EditarTipoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Formulario,private tipo:TipoService,private toastr:ToastrService) {
      this.formulario=this.createFormGroup();
      this.formulario.controls['id'].setValue(data.id);
      this.formulario.controls['id_producto'].setValue(data.id_producto);
      this.formulario.controls['descripcion'].setValue(data.descripcion);
      
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
      return  'Solo se aceptan letras';
      return  '';
  }
  nuevo(){
    // this.dialogRef.close();
  }

}
