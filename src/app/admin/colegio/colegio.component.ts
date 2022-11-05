import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { ColegioService } from 'src/app/services/colegio.service';
import { CrearColegioComponent } from './crear-colegio/crear-colegio.component';
import { EditarColegioComponent } from './editar-colegio/editar-colegio.component';
import { FormularioColegio } from './formulario-colegio';

@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html',
  styleUrls: ['./colegio.component.scss']
})
export class ColegioComponent implements OnInit {
  constructor(private colegio:ColegioService, private route:Router,private toastr: ToastrService,private dialog:MatDialog) { 
  }
  colegios=[];
  ngOnInit(): void {
    this.colegio.listar().subscribe((data:any)=>{
      this.colegios=data;
    });
  }
  filterpost=[];
  public form={id:null,aula:null,maquinas:null,columnas:null,jefe_labo:null,imagen:null,created_at:null,updated_at:null};
  agregar() {
    let data: FormularioColegio;
    const dialogo1 = this.dialog.open(CrearColegioComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
      this.nuevo(art.value);
    }
    );
  }
  cambiar(lab) {
    console.log(lab);
    const dialogo1 = this.dialog.open(EditarColegioComponent, {data:lab});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
      this.update(art.value);
    }
    );
  }
  nuevo(datos){
    let form=datos;
    let formulario:FormularioColegio;
    let n = this.colegios.length;
    formulario=new FormularioColegio(0,n,form.nombre,form.color);
    console.log(formulario)
    this.colegio.nuevo(formulario).subscribe((data:any)=>{
      this.colegios=data;
      this.toastr.success("Colegio Creado",'Exito!');
    },
    error=>{
      this.toastr.error("No se pudo agregar el Colegio",'Error!');
      // console.log(error.error.error);
    });
  }
  remove(id){
    this.colegio.eliminar(id).subscribe((data:any)=>{
      this.colegios=data;
    });
    this.toastr.warning("Colegio Eliminado",'Atencion!')      
  }
  update(datos) {
    let form=datos;
    let formulario:FormularioColegio;
    formulario=new FormularioColegio(form.id,form.codigo,form.nombre,form.color);
    this.colegio.update(formulario.id,formulario).subscribe((data:any)=>{
        this.toastr.success("Colegio Actualizado",'Exito!');
        this.colegios=data;
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
    for(let u of this.colegios){
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
          // imag=this.labo.imagen()+imagenes[data.row.index];
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
