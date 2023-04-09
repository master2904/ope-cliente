import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Formulario } from '../formulario';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.scss']
})
export class VerProductoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VerProductoComponent>,@ Inject(MAT_DIALOG_DATA) public form: Formulario) {
      
    }
  ngOnInit(): void {
  }
  cancelar() {
    this.dialogRef.close();
  }
  
}
