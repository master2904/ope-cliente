import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormularioEquipo } from '../formulario-equipo';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrls: ['./editar-equipo.component.scss']
})
export class EditarEquipoComponent implements OnInit {
  numero:any=/[0-9]+/;
  user:any=/[A-Za-z0-9]/;
  letras:any=/[A-Za-z]/;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      nombre:new FormControl('',[Validators.required,Validators.minLength(10),Validators.pattern(this.letras)]),
      colegio:new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(this.user)]),
      cuenta: new FormControl(''),
      clave: new FormControl(''),
      id_categoria: new FormControl(''),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get nombre(){return this.agregar.get('nombre'); }
  get colegio(){return this.agregar.get('colegio'); }
  get cuenta(){return this.agregar.get('cuenta'); }
  get clave(){return this.agregar.get('clave'); }

  constructor(public dialogRef: MatDialogRef<EditarEquipoComponent>,@ Inject(MAT_DIALOG_DATA) public data: FormularioEquipo) {
    this.agregar=this.createFormGroup();
    this.agregar.controls['id'].setValue(data.id);
    this.agregar.controls['nombre'].setValue(data.nombre);
    this.agregar.controls['colegio'].setValue(data.id_colegio);
    this.agregar.controls['cuenta'].setValue(data.cuenta);
    this.agregar.controls['clave'].setValue(data.clave);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_nombre() {
    if (this.nombre.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nombre.hasError('minLength'))
      return 'minom 3 letras';
    if(this.nombre.hasError('pattern'))
      return 'Ingrese el formato indicado';
  }
  error_colegio() {
    if (this.colegio.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.colegio.hasError('pattern'))
      return 'Solo se aceptan letras y numeros, con minimo de 5 caracteres';
  }
  ngOnInit(): void {
    
  }
}
