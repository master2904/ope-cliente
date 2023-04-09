import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Formulario } from '../formulario';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {


  numero:any=/[0-9]+/;
  letras:any=/[A-Za-z ]{3,30}/;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      nit:new FormControl('',[Validators.required]),
      nombre: new FormControl('',Validators.required),
      apellido: new FormControl(''),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get nit(){return this.agregar.get('nit');}
  get nombre(){return this.agregar.get('nombre');}
  get apellido(){return this.agregar.get('apellido');}
  get f(){
    return this.agregar.controls;
  }
  settear(){
    this.agregar.reset({id:'',nit:'', nombre:'', apellido:''});
  }
  constructor(
    public dialogRef: MatDialogRef<EditarClienteComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Formulario,private labo:ClienteService) {
    this.agregar=this.createFormGroup();
    this.agregar.controls['id'].setValue(data.id);
    this.agregar.controls['nit'].setValue(data.nit);
    this.agregar.controls['nombre'].setValue(data.nombre);
    this.agregar.controls['apellido'].setValue(data.apellido);

  }
  nuevo(){
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_nit() {
    if (this.nit.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nit.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.nit.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_nombre() {
    if (this.nombre.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nombre.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.nombre.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_apellido() {
    if (this.apellido.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.apellido.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.apellido.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  ngOnInit(): void {
  }

}
