import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormularioScore } from '../formulario-score';

@Component({
  selector: 'app-registrar-solucion',
  templateUrl: './registrar-solucion.component.html',
  styleUrls: ['./registrar-solucion.component.scss']
})
export class RegistrarSolucionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegistrarSolucionComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: FormularioScore) {
      this.agregar=this.createFormGroup();
    }
  ngOnInit(): void {
  }

  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      id_problema:new FormControl(''),
      id_equipo:new FormControl(''),
      estado: new FormControl(''),
      tiempo: new FormControl('',[Validators.required,Validators.min(1),Validators.max(999)]),
      intento: new FormControl('',[Validators.required,Validators.min(1),Validators.max(999)]),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  get id_problema(){return this.agregar.get('id_problema'); }
  get id_equipo(){return this.agregar.get('id_equipo'); }
  get estado(){return this.agregar.get('estado'); }
  get tiempo(){return this.agregar.get('tiempo'); }
  get intento(){return this.agregar.get('intento'); }
  
  
  agregar:FormGroup;
  
  nuevo(){
    // this.agregar.controls['img'].setValue(this.nombre_i);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_tiempo() {
    if (this.tiempo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.tiempo.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.tiempo.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_intento() {
    if (this.intento.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.intento.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.intento.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  } 
}
