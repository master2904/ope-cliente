import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ColegioService } from 'src/app/services/colegio.service';
import { FormularioColegio } from '../formulario-colegio';

@Component({
  selector: 'app-crear-colegio',
  templateUrl: './crear-colegio.component.html',
  styleUrls: ['./crear-colegio.component.scss']
})
export class CrearColegioComponent implements OnInit {
  agregar:FormGroup;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      nombre:new FormControl('',[Validators.required,Validators.minLength(3)]),
      color:new FormControl('',[Validators.required]),
      codigo: new FormControl('',[Validators.required,Validators.min(1),Validators.max(100)]),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  constructor(
    public dialogRef: MatDialogRef<CrearColegioComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: FormularioColegio,private colegio:ColegioService,private toastr:ToastrService) {
      this.agregar=this.createFormGroup();

    }
  get color(){return this.agregar.get('color'); }  
  get nombre(){return this.agregar.get('nombre'); }  
  get codigo(){return this.agregar.get('codigo'); }  
  ngOnInit(): void {
  }
  nuevo(){  }
  cancelar() {
    this.dialogRef.close();
  }
  error_codigo() {
    if (this.codigo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (this.codigo.hasError('min')) {
      return 'Numeros positivos';
    }
    if (this.codigo.hasError('max')) {
      return 'Maximo 100';
    }
  }
  
  error_nombre() {
    if (this.nombre.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (this.nombre.hasError('minlength')) 
      return  'Ingrese minimo 3 caracteres';
    return this.nombre.hasError('pattern') ? 'Solo se aceptan letras alfanumericas' : '';
  }
  error_color() {
    if (this.color.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  
}
