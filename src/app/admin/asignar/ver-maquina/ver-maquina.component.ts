import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormularioAsignar } from '../formulario-asignar';

@Component({
  selector: 'app-ver-maquina',
  templateUrl: './ver-maquina.component.html',
  styleUrls: ['./ver-maquina.component.scss']
})
export class VerMaquinaComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<VerMaquinaComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any) {
      
      console.log(data) ;
  }
  datos=null;
  m=null
  ngOnInit(): void {
    this.datos=this.data['v'];
    this.m=this.data['maquina'];
  }
  cancelar() {
    this.dialogRef.close();
  }
}
