import { Component,Inject, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LaboratorioService } from '../../services/laboratorio.service';
import autoTable, { Row } from 'jspdf-autotable'
import { jsPDF } from "jspdf";
import { Formulario } from './formulario';
import { CrearLaboratorioComponent } from './crear-laboratorio/crear-laboratorio.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarLaboratorioComponent } from './editar-laboratorio/editar-laboratorio.component';
import { VerLaboratorioComponent } from './ver-laboratorio/ver-laboratorio.component';
@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.scss']
})
export class LaboratorioComponent implements OnInit {
  title = 'Laboratorio';
  laboratorio =[]; 
  llenar_imagen(img){    
    return this.labo.imagen()+img;
  }
  constructor(private labo:LaboratorioService, private route:Router,private toastr: ToastrService,private dialog:MatDialog) { 
  }
  ngOnInit(): void {
    this.labo.listar().subscribe((data:any)=>{
      this.laboratorio=data;
    });
  }
  filterpost=[];
  public form={id:null,aula:null,maquinas:null,columnas:null,jefe_labo:null,imagen:null,created_at:null,updated_at:null};
  agregar() {
    let data: Formulario;
    const dialogo1 = this.dialog.open(CrearLaboratorioComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
      this.nuevo(art.value);
    }
    );
  }
  cambiar(lab) {
    const dialogo1 = this.dialog.open(EditarLaboratorioComponent, {data:lab});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
      this.update(art.value);
    }
    );
  }
  ver_labo(lab) {
    const dialogo1 = this.dialog.open(VerLaboratorioComponent, {data:lab});
  }
  nuevo(datos){
    let form=datos;
    let formulario:Formulario;
    formulario=new Formulario(0,form.aula,form.jefe_labo,form.maquinas,form.columnas,form.img);
    this.labo.nuevo(formulario).subscribe((data:any)=>{
      this.laboratorio=data;
      this.toastr.success("Laboratorio Creado",'Exito!');
    },
    error=>{
      this.toastr.error("No se pudo agregar el laboratorio",'Error!');
      console.log(error.error.error);
    });
  }
  remove(id){
    this.labo.remove(id).subscribe((data:any)=>{
      this.laboratorio=data;
    });
    this.toastr.success("Laboratorio Eliminado",'Exito!')      
  }
  update(datos) {
    let form=datos;
    let formulario:Formulario;
    formulario=new Formulario(form.id,form.aula,form.jefe_labo,form.maquinas,form.columnas,form.img);
    this.labo.update(formulario.id,formulario).subscribe((data:any)=>{
        this.toastr.success("Laboratorio Actualizado",'Exito!');
        this.laboratorio=data;
      });       
  }
  pdf(){
    let fecha=new Date();
    const titulo="laboratorio "+fecha;
    const doc = new jsPDF('p', 'pt', 'a4');
    const imagen= new Image();
    imagen.src="assets/images/FNI.png";
    doc.addImage(imagen,"png",480,30,60,60);
    imagen.src="assets/images/uto.png";
    doc.addImage(imagen,"png",40,30,60,60);
    imagen.src="assets/images/sis_inf.png";
    doc.addImage(imagen,"png",40,130,515,40);
    doc.setFontSize(9);
    doc.setFont('helvetica','bold')
    doc.text("UNIVERSIDAD TECNICA DE ORURO",230,45);
    doc.text("FACULTAD NACIONAL DE INGENIERIA",220,57);
    doc.text("INGENIERIA DE SISTEMAS E INGENIERIA INFORMATICA",190,69);
    doc.setFontSize(20);
    doc.text("LABORATORIOS",240,110);
    doc.setFontSize(10);
    doc.setFont('helvetica','normal')
    var data=[]
    let i=1;
    let imagenes=[];
    for(let u of this.laboratorio){
      let x=[];
      x.push(i++)
      x.push(u.aula)
      // x.push(this.role(u.rol))
      x.push(u.jefe_labo)
      x.push(u.maquinas)
      x.push(" ")
      imagenes.push(u.imagen)
      data.push(x)
    }
    let imag;
    let cabeza=['#','Aula','Jefe de Laboratorio','#Maquinas','    Imagen    ']
    // autoTable(doc,{columns:cabeza,body:data,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
    autoTable(doc,{columns:cabeza,body:data,pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
    didDrawCell: (data) => {
      data.row.height=50;
      if (data.section === 'body' && data.column.index === 4) {
        data.row.height=80;
        // data.cell.width=100;
        // console.log(data.cell.text)
          imag=this.labo.imagen()+imagenes[data.row.index];
          // imag=this.base+data.cell.text;
          // imag=this.base+'202185131519.jpg';
        // doc.addImage(imag,"jpeg",10,10,60,60);
        // var base64Img = 'data:image/jpeg;base64,iVBORw0KGgoAAAANS...'
          doc.addImage(imag, 'JPEG', data.cell.x + 2, data.cell.y -20, 65, 65)
        }
      }
    })
    addFooters(doc)
    doc.save(titulo+'.pdf')
  }
}
const addFooters = doc => {
  const pageCount = doc.internal.getNumberOfPages()
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text('Usuario: ' + localStorage.getItem('nombre')+" "+localStorage.getItem('apellido'), 40, doc.internal.pageSize.height-10, {align:'left'})
    doc.text('Página ' + String(i) + ' de ' + String(pageCount), 550, doc.internal.pageSize.height-10, {align:'right'})
  }
}
