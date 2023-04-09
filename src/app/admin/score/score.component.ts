import { Component, OnInit } from '@angular/core';
import { ConcursoService } from '../../services/concurso.service';
import { EquipoService } from '../../services/equipo.service';
import { CategoriaService } from '../../services/categoria.service';
import { ProblemaService } from '../../services/problema.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScoreService } from '../../services/score.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { FormularioScore } from './formulario-score';
import { RegistrarSolucionComponent } from './registrar-solucion/registrar-solucion.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';

  @Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  concursos=null;
  categorias=null;
  equipos=null;
  problemas=null;
  detalle=null;
  detalles=null;
  filterpost=[];
  actualizar:FormGroup;
  verificar=false;
  constructor(private concurso:ConcursoService, private equipo:EquipoService,private categoria:CategoriaService, private problema:ProblemaService, private toasrt:ToastrService,private score:ScoreService,private dialog:MatDialog,private dialogo:MatDialog) { }
  placeholderVar: string = "Your placeholder";
  editar=false;
  finalizar(){
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Usuario?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        let form=[];
        let i=1;
        this.detalles.forEach(element => {
            let f={id:null,posicion:null};
            // console.log(element[0].id)
            f.id=element[0].id;
            f.posicion=i++;
            form.push(f);
          });
          this.equipo.finalizar(form,this.detalles.length).subscribe((data:any)=>{
            form=data;
            console.log(data)
            this.toasrt.success("Concurso Finalizado","Exito");
            this.editar=false;
          })
      }
      else
      this.toasrt.info('Operacion Cancelada');
    });
  }
  ngOnInit(): void {
    // this.actualizar=this.createFormGroup();
    this.concurso.listar().subscribe((data:any)=>{
      this.concursos=data;
      // console.log(data);
    });
  }
  detalle_concurso=null;
  listar_categorias(c){
    this.editar=false;
    this.detalle_concurso=c;
    this.categoria.listar_id(c.id).subscribe((data:any)=>{
      this.categorias=data;
    });
  }
  prueba=[];
  total=[];
  id=null;
  flat=false;
  nombre_concurso=null;
  mostrar_detalle(id){
    this.editar=true;
    this.id=id;
    this.flat=true;
    this.score.score(id).subscribe((data:any)=>{
      this.problemas=data[0];
      this.detalles=data[1];
      this.equipos=this.detalles[0];
      this.detalle=this.detalles[1];
      this.total=this.detalles[2];
      try{
      let x:number= this.detalles[0][0].posicion
      // console.log(this.detalles)
      if(x>0)
        this.verificar=true;
      }
      catch(error){
        this.toasrt.warning('Revise si los equipos estan asignados en las maquinas','Alerta');
      }
      this.ordenar();
    });
  }
  f=null;
  abrirDialogo() {
    let data: FormularioScore;
    const dialogo1 = this.dialog.open(RegistrarSolucionComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.nuevo(art.value);
      else
        this.toasrt.info('Operacion Cancelada')
    }
    );
  }
    copiar(d){
    this.f=d;
    // this.agregar.reset({tiempo:'',intento:''});
  }
  ordenar(){
    let n=this.detalles.length;
    for(let i=0;i<n;i++){
      for(let j=0;j<n;j++){
          if(this.detalles[i][2].resuelto==this.detalles[j][2].resuelto){
            if(this.detalles[i][2].tiempo<this.detalles[j][2].tiempo){
              let aux=this.detalles[i];
              this.detalles[i]=this.detalles[j];
              this.detalles[j]=aux;
            }
          }              
          else{
            if(this.detalles[i][2].resuelto>this.detalles[j][2].resuelto){
              let aux=this.detalles[i];
              this.detalles[i]=this.detalles[j];
              this.detalles[j]=aux;
            }
          }
      }
    }
  }
  nuevo(formulario){
    this.f.intento=formulario.intento;
    this.f.tiempo=formulario.tiempo;
    this.f.estado=1;
    this.f.id_cat=this.id;
    this.score.nuevo(this.f).subscribe((data:any)=>{
      console.log(data)
      this.detalles=data[1];
      this.problemas=data[0];
      this.equipos=this.detalles[0];
      this.detalle=this.detalles[1];
      this.total=this.detalles[2];
      this.ordenar();
      this.toasrt.success("Registro Agregado");
    },
    error=>{
      this.f.estado=0;
      this.f.intento=0;
      let err=error.status;
      if(err==400)
        this.toasrt.error("Usted ya no puede realizar operaciones","Concurso Finalizado");
    });
  }
  eliminar(form){
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea eliminar esta solucion?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        let formulario={id:null,id_cat:null};
        formulario.id=form.id;
        formulario.id_cat=this.id;
        this.score.eliminar(formulario).subscribe((data:any)=>{
          console.log(data)
          this.detalles=data[1];
          this.problemas=data[0];
          this.equipos=this.detalles[0];
          this.detalle=this.detalles[1];
          this.total=this.detalles[2];
          this.ordenar();
          this.toasrt.warning('Solucion Removida');
        },
        error=>{
          let err=error.status;
          if(err==400)
            this.toasrt.warning("Usted ya no puede realizar operaciones","Concurso Finalizado");
        });
      }
      else
        this.toasrt.info('Operacion Cancelada')
    });      
  }
  posicion(i,detalle){
    if(i==0&&detalle.resuelto>0){
      return 1;
    }
    if(i==1&&detalle.resuelto>0){
      return 2;
    }
    if(i==2&&detalle.resuelto>0){
      return 3;
    }
      return 4; 
  }
  pdf(){
    const doc = new jsPDF('p', 'pt', 'a4');
    const imagen= new Image();
    imagen.src="assets/images/FNI.png";
    doc.addImage(imagen,"png",480,30,60,60);
    imagen.src="assets/images/uto.png";
    doc.addImage(imagen,"png",40,30,60,60);
    imagen.src="assets/images/sis_inf.png";
    doc.addImage(imagen,"png",40,185,515,40);
    const id_categoria=this.id;
    let titulo="";
    for(var i =0 ;i<this.categorias.length;i++){
      if(this.categorias[i].id==id_categoria){
        titulo=this.categorias[i].titulo+" - "+this.categorias[i].descripcion;
        break;
      }
    }
    doc.setFontSize(9);
    doc.setFont('helvetica','bold')
    doc.text("UNIVERSIDAD TECNICA DE ORURO",230,45);
    doc.text("FACULTAD NACIONAL DE INGENIERIA",220,57);
    doc.text("INGENIERIA DE SISTEMAS E INGENIERIA INFORMATICA",190,69);
    doc.setFontSize(20);
    doc.text("RESULTADOS FINALES",200,110);
    doc.setFontSize(10);
    doc.text("CONCURSO: ",40,140);
    doc.text("CATEGORIA: ",40,155);
    doc.text("FECHA: ",40,170);
    doc.setFont('helvetica','normal')
    doc.text(this.detalle_concurso.titulo+"",110,140);
    doc.text(titulo,110,155);
    doc.text(this.detalle_concurso.fecha+"",110,170);
    doc.setDrawColor(0);
    var tabla=[];
    var i=1,n=0;
    for(let detalle of this.detalles){
      var vector=[];
      vector.push(i);
      var nombre=detalle[0].nombre;
      // var cuenta=detalle[0].cuenta;
      vector.push(nombre);
      // vector.push(cuenta);
      var problema=detalle[1];
      for(let p of problema){
        if(p.intento>0)
          vector.push("        "+p.intento+"/"+p.tiempo);
        else
          vector.push("           ");
      }
      var resuelto=detalle[2].resuelto;
      var tiempo=detalle[2].tiempo;
      vector.push(resuelto+"("+tiempo+")");
      var t=this.posicion(i-1,detalle[2]);
      if(t==1)
        vector.push("          Oro")
      if(t==2)
        vector.push("          Plata")
      if(t==3)
        vector.push("          Bronce")
      if(t==4)
        vector.push("Mencion de Honor")
        // vector.push(" ");
      // else
        // if(i==4)
          // vector.push("Honorífica");
            // else
              // vector.push("  -  ");
      tabla.push(vector); 
      i++;
    }
    // console.log(tabla);
    var cabeza=[];
    cabeza.push("#");
    cabeza.push("Equipo/Problema");
    // cabeza.push("Cuenta");
    for(let p of this.problemas){
      cabeza.push(p.alias);
      n++;
    }
    n+=3;
    cabeza.push("Total");
    cabeza.push("Medalla");
    // autoTable(doc,{columns:cabeza,body:tabla,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:230})
    // autoTable(doc,{html:'#tabla',theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:230})
    let imag;
    // console.log(tabla);
    
    autoTable(doc,{columns:cabeza,body:tabla,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:230,
    didDrawCell: (data) => {
      // data.row.height=20;
        if (data.section === 'body' && data.column.index === n) {
          if(tabla[data.row.index]){
            let f= tabla[data.row.index];
            let c= f[data.column.index];
            if(c=="          Oro")
            imag="assets/images/oro.png";
            if(c=="          Plata")
            imag="assets/images/plata.png";
            if(c=="          Bronce")
            imag="assets/images/bronce.png";
            if(c!="Mencion de Honor")
            doc.addImage(imag, 'JPEG', data.cell.x+5, data.cell.y -2, 20, 20)
          }
        }
    
        if (data.section === 'body' && data.column.index >1 && data.column.index<n-1) {
          // data.row.height=20;
          let f= this.detalles[data.row.index];
          // console.log(f);
          if(f!=undefined){
              let d=f[1][data.column.index-2].color;
              if(d!="#f0ffff"){
                // console.log(d)
                data.row.height=30;
                doc.setFillColor(d+"");
                doc.circle(data.cell.x+(data.cell.width/2) ,data.cell.y+10,7,'FD');
                doc.setDrawColor("#000000");
                doc.setFillColor("#ffffff");
              }
            }
          }
      }
    })    
    addFooters(doc)
    var fecha=new Date()
    doc.save(titulo+fecha+'.pdf')
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