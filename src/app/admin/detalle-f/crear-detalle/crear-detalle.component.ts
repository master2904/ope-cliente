import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../formulario';
import { DetalleService } from 'src/app/services/detalle.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-detalle',
  templateUrl: './crear-detalle.component.html',
  styleUrls: ['./crear-detalle.component.scss']
})
export class CrearDetalleComponent implements OnInit {

  numero:any=/[0-9]+/;
  letras:any=/[A-Za-z ]{3,30}/;
  file:File=null;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      codigo:new FormControl('',[Validators.required,Validators.min(1),Validators.max(9999)]),
      id_tipo: new FormControl(''),
      descripcion: new FormControl('',Validators.required),
      cantidad: new FormControl('',[Validators.required,Validators.min(1),Validators.max(9999)]),
      precio_compra: new FormControl('',[Validators.required,Validators.min(0),Validators.max(9999)]),
      precio_venta: new FormControl('',[Validators.required,Validators.min(0),Validators.max(9999)]),
      stock_minimo: new FormControl('',[Validators.required,Validators.min(1),Validators.max(9999)]),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get codigo(){return this.agregar.get('codigo');}
  get id_tipo(){return this.agregar.get('id_tipo');}
  get descripcion(){return this.agregar.get('descripcion');}
  get cantidad(){return this.agregar.get('cantidad');}
  get precio_compra(){return this.agregar.get('precio_compra');}
  get precio_venta(){return this.agregar.get('precio_venta');}
  get stock_minimo(){return this.agregar.get('stock_minimo');}
  get f(){
    return this.agregar.controls;
  }
  settear(){
    this.agregar.reset({id:'',codigo:'', id_tipo:'', descripcion:'', cantidad:'', precio_compra:'', precio_venta:'', stock_minimo:''});
  }
  constructor(
    public dialogRef: MatDialogRef<CrearDetalleComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Formulario,private labo:DetalleService) {
    this.agregar=this.createFormGroup();
  }
  nuevo(){
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_codigo() {
    if (this.codigo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.codigo.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.codigo.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_descripcion() {
    if (this.descripcion.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.descripcion.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.descripcion.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_cantidad() {
    if (this.cantidad.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.cantidad.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.cantidad.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_precio_compra() {
    if (this.precio_compra.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.precio_compra.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.precio_compra.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_precio_venta() {
    if (this.precio_venta.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.precio_venta.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.precio_venta.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_stock_minimo() {
    if (this.stock_minimo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
// ç    if(this.stock_minimo.hasError('max'))
      // return 'Numero maximo aceptado: 400';
    return this.stock_minimo.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  ngOnInit(): void {
  }

}
