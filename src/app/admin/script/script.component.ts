import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ConcursoService } from 'src/app/services/concurso.service';
import { EquipoService } from 'src/app/services/equipo.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import autoTable, { Row } from 'jspdf-autotable'
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit {
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
    'id_categoria':null,
    'numero_maquina':null,
    'created_at':null,
    'updated_at':null
  };
  constructor(private toast:ToastrService,private equipo:EquipoService,private categoria:CategoriaService,private concurso:ConcursoService,public dialogo: MatDialog) {
   }
  ngOnInit(): void {
    this.concurso.listar().subscribe((data:any)=>{
      this.concursos=data;
    });
  }  
  ide=null;
  listar_concurso(c){
    this.fequipo=0;
    this.cuenta=false;
    this.fboton=true;
    this.ide=c.id;
    this.f_con=c;
    // console.log(id);
    this.equipo.listar_script(c.id).subscribe((data:any)=>{
      this.equipos=data;
      // console.log(this.equipos);
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
  gg=0;
  generar(){
    this.cuenta=true;
    let n=this.equipos.length;
    if(this.fequipo===1){
      for(let i=0;i<n;i++){
        let y:string ="team"+(i+1);
        this.equipos[i]['cuenta']=y;
        this.equipos[i]['clave']=y;
      }
    }
    else{
      if(this.fequipo===2){
        for(let i=0;i<n;i++){
          let y:string ="team";
          let x=4;  
          let p=6;
          while(x--){
            let v=Math.trunc((Math.random()*10));
            y+=v;
          }
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let pas="";
          while(p--){
            pas=pas+characters.charAt(Math.floor(Math.random()*characters.length));
          }
          this.equipos[i]['cuenta']=y;
          this.equipos[i]['clave']=pas;
        }
      }
    }
    this.gg++;
  }
  guardar(): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Guardar los cambios?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.equipo.rango(this.equipos,this.ide).subscribe((data:any)=>{
          this.equipos=data;
          // console.log(this.equipos);
        });
        this.toast.success('Cuentas y claves actualizados','')
      } else {
        this.toast.info('No se guardo la informacion','');
      }
    });
  }
  s:string="";
  script(){
    this.cuenta=false;
    let n=this.equipos.length;
    this.s="[user]\n";
    let t=1005;
    for(let i=0;i<n;i++){
      this.s=this.s+"usernumber="+t+"\n";
      this.s=this.s+"usersitenumber=904\n";
      this.s=this.s+"username="+this.equipos[i]['cuenta']+"\n";
      this.s=this.s+"userfullname="+this.equipos[i]['nombre']+"\n";
      this.s=this.s+"userenabled=t"+"\n";
      this.s=this.s+"usertype=user"+"\n";
      this.s=this.s+"usermultilogin=t"+"\n";
      this.s=this.s+"userpassword="+this.equipos[i]['clave']+"\n";
      this.s=this.s+"\n";
      t++;
    }
    const binaryData=[];
    binaryData.push(this.s);
    const filepath=window.URL.createObjectURL(new Blob(binaryData));
    const script=document.createElement('a');
    script.href=filepath;
    script.setAttribute('download','scritp.txt');
    document.body.appendChild(script);
    script.click();
    this.toast.success('Archivo Descargado Exitosamente');    
  }
  mostrar_equipos(id){
    this.equipo.listar_id(id).subscribe((data:any)=>{
      this.equipos=data;
      console.log('equipos: ');
      console.log(this.equipos);
    });
  }
  pdf(){
    let fecha=new Date();
    const titulo="cuentas_claves"+fecha;
    const doc = new jsPDF('p', 'pt', 'a4');
    const imagen= new Image();
    imagen.src="assets/images/FNI.png";
    doc.addImage(imagen,"png",480,30,60,60);
    imagen.src="assets/images/uto.png";
    doc.addImage(imagen,"png",40,30,60,60);
    imagen.src="assets/images/sis_inf.png";
    doc.addImage(imagen,"png",40,155,515,40);
    doc.setFontSize(9);
    doc.setFont('helvetica','bold')
    doc.text("UNIVERSIDAD TECNICA DE ORURO",230,45);
    doc.text("FACULTAD NACIONAL DE INGENIERIA",220,57);
    doc.text("INGENIERIA DE SISTEMAS E INGENIERIA INFORMATICA",190,69);
    doc.text("CONCURSO: ",40,140);
    doc.text(this.f_con.titulo+"",110,140);
    doc.setFontSize(20);
    doc.text("CUENTAS Y CLAVES",200,110);
    doc.setFontSize(10);
    doc.setFont('helvetica','normal')
    var data=[]
    let i=1;
    for(let u of this.equipos){
      let x=[];
      x.push(i++)
      x.push(u.nombre)
      x.push(u.titulo)
      x.push(u.cuenta)
      x.push(u.clave)
      data.push(x)
    }
    let cabeza=['#','Equipo','Categoria','Cuenta','Clave'];
    autoTable(doc,{columns:cabeza,body:data,pageBreak:'auto',theme:'grid',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:200})
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

