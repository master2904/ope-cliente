import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormularioAsignar } from '../formulario-asignar';

@Component({
  selector: 'app-registrar-equipo',
  templateUrl: './registrar-equipo.component.html',
  styleUrls: ['./registrar-equipo.component.scss']
})
export class RegistrarEquipoComponent implements OnInit {
  @Input() vector:any;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      id_concurso:new FormControl('',[Validators.required]),
      id_laboratorio:new FormControl('',[Validators.required]),
      id_equipo: new FormControl('',Validators.required),
      estado: new FormControl('',[Validators.required]),
      numero: new FormControl('',[Validators.required]),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get id_concurso(){return this.agregar.get('id_concurso'); }
  get id_laboratorio(){return this.agregar.get('id_laboratorio'); }
  get id_equipo(){return this.agregar.get('id_equipo'); }
  get estado(){return this.agregar.get('estado'); }
  get numero(){return this.agregar.get('numero'); }
  get f(){
    return this.agregar.controls;
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_id_equipo() {
    if (this.id_equipo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  constructor(public dialogRef: MatDialogRef<RegistrarEquipoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: FormularioAsignar) {   
      // console.log(data);
  }
  equipos=[];
  ngOnInit(): void {
    this.equipos=this.data['v']
    console.log(this.equipos)
    this.agregar=this.createFormGroup();
    let valor=this.data['datos']
    this.agregar.controls['id_concurso'].setValue(valor.id_concurso);
    this.agregar.controls['id_laboratorio'].setValue(valor.id_laboratorio);
    // this.agregar.controls['id_equipo'].setValue(valor.id_equipo);
    this.agregar.controls['estado'].setValue(valor.estado);
    this.agregar.controls['numero'].setValue(valor.numero);
  }

}
