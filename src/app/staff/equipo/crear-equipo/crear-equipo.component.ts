import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormularioEquipo } from '../formulario-equipo';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.scss']
})
export class CrearEquipoComponent implements OnInit {
  numero:any=/[0-9]+/;
  user:any=/[A-Za-z0-9]/;
  letras:any=/[A-Za-z]/;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      nombre:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern(this.letras)]),
      id_colegio:new FormControl('',[Validators.required]),
      id_categoria: new FormControl(''),
      cuenta: new FormControl(''),
      clave: new FormControl(''),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get nombre(){return this.agregar.get('nombre'); }
  get id_colegio(){return this.agregar.get('id_colegio'); }
  get cuenta(){return this.agregar.get('cuenta'); }
  get clave(){return this.agregar.get('clave'); }

  constructor(
      public dialogRef: MatDialogRef<CrearEquipoComponent>,
      @ Inject(MAT_DIALOG_DATA) public data: FormularioEquipo) {    
    this.agregar=this.createFormGroup();
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
    if (this.id_colegio.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  col=[];
  ngOnInit(): void {
   this.col=this.data['c'];
  }
}
