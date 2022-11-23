import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import { environment } from 'src/environments/environment.prod';
import { EquipoService } from '../../services/equipo.service';
import { ConcursoService } from '../../services/concurso.service';
import { MaquinaService } from '../../services/maquina.service';
import { ColegioService } from 'src/app/services/colegio.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VerMaquinaComponent } from './ver-maquina/ver-maquina.component';
import { FormularioAsignar } from './formulario-asignar';
import { RegistrarEquipoComponent } from './registrar-equipo/registrar-equipo.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.scss']
})
export class AsignarComponent implements OnInit {
  public laboratorio={
    'id':null,
    'aula':null,
    'jefe_labo':null,
    'maquinas':null,
    'columnas':null
  };
  maquinas=[];
  // base=environment.imagen+'laboratorio/';
  laboratorios=[];
  ide=null;
  flat=null;
  imagen=null;
  concursos=[];  
  equipos=[];
  fboton=false;
  fequipo=0;
  cuenta=false;
  f_cat={
    id:null,
    titulo:null,
    descripcion:null,
    id_concurso:null
  };
  f_con={
    titulo:null,
    gestion:null,
    fecha:null,
    hora:null
  };
  numero:any=/[0-9]+/;
  user:any=/[A-Za-z0-9]/;
  letras:any=/[A-Za-z]/;
  filterpost=[];
  public form={    
    'id':null,
    'nombre':null,
    'colegio':null,
    'cuenta':null,
    'clave':null,
    'id_concurso':null,
    'numero_maquina':null,
    'created_at':null,
    'updated_at':null
  };
  colegios=null;
  alta(con){    
    this.maquinas=[];
    const x=this.laboratorio.columnas;
    const n=this.laboratorio.maquinas/x;
    let maq=[];
    this.maquina.alta(con.id).subscribe((data:any)=>{
      maq=data;
      let c=1;
      for (let i = 0; i < n; i++) {
        const fila=[];
        for (let j = 0; j < x; j++) {
          if(c<=this.laboratorio.maquinas)
        fila.push(maq[c]);
        c++;
      }
      this.maquinas.push(fila);
    }
    });
  }
  nuevo(maquina){
    let datos: FormularioAsignar;
    datos=maquina;
    let e=[];
    this.equipo.listar_concurso(maquina.id_concurso).subscribe((data:any)=>{
      e=data;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data={v:e,datos};
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      const dialogo1 = this.dialog.open(RegistrarEquipoComponent, dialogConfig);
      dialogo1.afterClosed().subscribe(art => {
        if (art != undefined)
          this.baja(art.value);
        else
          this.toastr.info('Operacion Cancelda');
      }
      );
    });
  }
  baja(m){
    this.maquinas=[];
    const x=this.laboratorio.columnas;
    const n=this.laboratorio.maquinas/x;
    let maq=[];
    m.estado=1;
    this.maquina.baja(m).subscribe((data:any)=>{
      maq=data;
      let c=1;
      for (let i = 0; i < n; i++) {
        const fila=[];
        for (let j = 0; j < x; j++) {
          if(c<=this.laboratorio.maquinas)
        fila.push(maq[c]);
        c++;
      }
      this.maquinas.push(fila);
    }
    });
  }
  flabo=false;
  listar_concurso(id){
    this.flabo=true;
    this.fequipo=1;
    this.cuenta=false;
    this.fboton=true;
    this.ide=id;
    this.maquinas=[]
    this.equipo.listar_concurso(id).subscribe((data:any)=>{
      this.equipos=data;
    });
    
  }
  n(){
    return 15;
  }
  prueba(){
    this.cuenta=false;
    this.fequipo=1;
  }
  contest(){
    this.cuenta=false;
    this.fequipo=2;
  }
  
  mostrar_equipos(id){
    this.equipo.listar_id(id).subscribe((data:any)=>{
      this.equipos=data;
      console.log('equipos: ');
      // console.log(this.equipos);
    });
  }
  constructor(private maquina:MaquinaService,private labo:LaboratorioService,private toastr:ToastrService, private equipo:EquipoService, private concurso:ConcursoService,private colegio:ColegioService,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.colegio.listar().subscribe((data:any)=>{
      this.colegios=data;
     
    }); 
    this.labo.listar().subscribe((data:any)=>{
      this.laboratorios=data;
    });
    this.concurso.listar().subscribe((data:any)=>{
      this.concursos=data;
    });
  }
  des=false;
  bus_lab(lab){
    // this.imagen=true;
    // this.labo.buscar(id).subscribe((data:any)=>{
      this.laboratorio=lab;
      this.des=true;
      this.llenar(lab.id);
    // });
  } 
  llenar(id){
    this.maquinas=[];
    const x=this.laboratorio.columnas;
    const n=this.laboratorio.maquinas/x;
    let maq=[];
    // console.log(this.ide+", "+id);
    this.maquina.listar(this.ide,id).subscribe((data:any)=>{
      maq=data;
      let c=1;
      // this.maquinas=[];
      for (let i = 0; i < n; i++) {
        const fila=[];
      for (let j = 0; j < x; j++) {
        if(c<=this.laboratorio.maquinas)
        fila.push(maq[c]);
        c++;
      }
      this.maquinas.push(fila);
    }
    console.log(this.maquinas);
  });
  }
  ver(maquina){
    console.log(maquina);
    this.equipo.buscar(maquina.id_equipo).subscribe((data:any)=>{
      let e=data;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data={v:e,maquina};
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      // const dialogo1 = this.dialog.open(RegistrarEquipoComponent, dialogConfig);
      const dialogo1 = this.dialog.open(VerMaquinaComponent, dialogConfig);
      dialogo1.afterClosed().subscribe(art => {
        // if (art != undefined)
        // this.nuevo(art.value);
        // console.log(data);
      }
      );
    });

  }
  pdf(){
    let fecha=new Date();
    const titulo="maquinas "+fecha;
    const doc = new jsPDF('p', 'pt', 'a4');
    const imagen= new Image();
    imagen.src="assets/images/FNI.png";
    doc.addImage(imagen,"png",480,30,60,60);
    imagen.src="assets/images/uto.png";
    doc.addImage(imagen,"png",40,30,60,60);
    imagen.src="assets/images/sis_inf.png";
    doc.addImage(imagen,"png",40,150,515,40);
    doc.setFontSize(9);
    doc.setFont('helvetica','bold')
    doc.text("UNIVERSIDAD TECNICA DE ORURO",230,45);
    doc.text("FACULTAD NACIONAL DE INGENIERIA",220,57);
    doc.text("INGENIERIA DE SISTEMAS E INGENIERIA INFORMATICA",190,69);
    doc.setFontSize(18);
    doc.text("DISTRIBUCION DE EQUIPOS",180,110);
    doc.setFontSize(12);
    doc.text("LABORATORIO: "+this.laboratorio.aula,40,135);
    doc.setFontSize(10);
    doc.setFont('helvetica','normal')
    var datos=[],m=[];
    // var m =[];
    let i=1;
    let cabeza=[];
    for(let fila of this.maquinas[0]){
      cabeza.push("");
      i++;
    }
    i=1;
    for(let fila of this.maquinas){
      let x=[],a=[];
      for(let col of fila){
        x.push(col.color);
        a.push(i);
        i++;
      }
      datos.push(x);
      m.push(a);
    }
    console.log(cabeza);
    // autoTable(doc,{columns:cabeza,body:data,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
    autoTable(doc,{columns:cabeza,body:m,pageBreak:'auto',theme:'grid',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:200,
    didDrawCell: (data) => {
        data.row.height=25;
      if (data.row.section === "body"){
        let c=datos[data.row.index];
        let d=c[data.column.index];
        if(d!=undefined)
          doc.setFillColor(d+"");
        else{
          doc.setFillColor("#fff");
          doc.setDrawColor("#fff");
        }
        doc.circle(data.cell.x+40,data.cell.y+10,10,'FD');
        doc.setDrawColor("#000000");
        doc.setFillColor("#ffffff");
      }
    }}
    )
    m=[];
    var color=[];
    let k=280+(this.maquinas.length*20),p=1;
    for(i = 0 ; i<this.maquinas.length;i++){
      for(let j = 0 ; j<this.maquinas[i].length;j++){
        let x=[];
        x.push(p++);
        x.push(this.maquinas[i][j].nombre)
        x.push(this.maquinas[i][j].colegio)
        x.push(' ')
        m.push(x);
        color.push(this.maquinas[i][j].color)
      }
    }
    doc.setFontSize(14);
    doc.text("Descripcion",40,k);
    doc.setFontSize(10);
    autoTable(doc,{columns:["#","EQUIPO","COLEGIO","COLOR"],body:m,theme:'grid',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:k+20,
        didDrawCell: (data) => {
          data.row.height=20;
      if (data.row.section === "body" && data.column.index == 3){
          let c=color[data.row.index];
          doc.setFillColor(c+"");  
          doc.circle(data.cell.x+30,data.cell.y+10,8,'FD');
          doc.setDrawColor("#000000");
          doc.setFillColor("#ffffff");
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

