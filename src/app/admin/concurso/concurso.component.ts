import { Component, OnInit } from '@angular/core';
import { ConcursoService } from '../../services/concurso.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import autoTable, { Row } from 'jspdf-autotable'
import { jsPDF } from "jspdf";
import { DatePipe } from '@angular/common';
import { CrearConsursoComponent } from './crear-consurso/crear-consurso.component';
import { formularioConcurso } from './formularioConcurso';
import { MatDialog } from '@angular/material/dialog';
import { EditarConsursoComponent } from './editar-consurso/editar-consurso.component';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';

@Component({
  selector: 'app-concurso',
  templateUrl: './concurso.component.html',
  styleUrls: ['./concurso.component.scss']
})
export class ConcursoComponent implements OnInit {
  filterpost=[];
  concursos=[];
  ide=null;
  actual=Date.now();
  agregar() {
    let data: formularioConcurso;
    const dialogo1 = this.dialog.open(CrearConsursoComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.nuevo(art.value);
      else
        this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  editar(datos) {
    const dialogo1 = this.dialog.open(EditarConsursoComponent, {data:datos});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
        this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  constructor(private concurso:ConcursoService,private toastr:ToastrService,private dp:DatePipe,private dialog:MatDialog,private dialogo:MatDialog){ 
  }
  ngOnInit(): void {
    this.concurso.listar().subscribe((data:any)=>{
      this.concursos=data;
    });
  }
  llenar_imagen(img){
    if(img=="")
      return "../../../assets/images/ope.png";
    return this.concurso.imagen()+img;
  }
  nuevo(datos){   
    let form=datos;
    let formulario:formularioConcurso;
    let fecha:Date;
    fecha=form.fecha;
    let nombre=""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+(fecha.getDay()+1);
    formulario=new formularioConcurso(0,form.img,form.titulo,0,nombre,form.hora);
    console.log(formulario);
      this.concurso.nuevo(formulario).subscribe((data:any)=>{
        this.concursos=data;
      });
      this.toastr.success("Concurso Creado",'Exito!');
  }
  remove(id): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Concurso?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.concurso.eliminar(id).subscribe((data:any)=>{
          this.concursos=data;
        });
        this.toastr.success("Concurso Eliminado",'');
      } else {
        this.toastr.info('Operacion Cancelada','');
      }
    });
  }
  cambio(id){
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea activar este concurso?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.concurso.cambio(id).subscribe((data:any)=>{
          this.concursos=data;
          this.toastr.success("Concurso Habilitado",'')
        });
      }
      else
      this.toastr.info('Operacion Cancelada','');
    });
  }
  update(datos) {
    try {
      let form=datos;
      let formulario:formularioConcurso;
      let fecha:Date;
      fecha=form.fecha;
      let nombre=""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+(fecha.getDay()+1);
      formulario=new formularioConcurso(form.id,form.img,form.titulo,form.estado,nombre,form.hora);
      console.log(formulario);
        this.concurso.actualizar(formulario.id, formulario).subscribe((data:any) => {
        this.toastr.success("Concurso Actualizado",'Exito!');
        this.concursos=data;
      });  
    } catch (error) {
      console.log(error)
      this.toastr.error("No se pudo realizar la operacion",'Error');
    }      
  }
  hora(h){
    switch(h){
      case 1: return "09:00";
      case 2: return "09:30";
      case 3: return "10:00";
      case 4: return "10:30";
      case 5: return "11:00";
    }
  }
}
