import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ConcursoService } from 'src/app/services/concurso.service';
import { EquipoService } from 'src/app/services/equipo.service';

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
  constructor(private toast:ToastrService,private equipo:EquipoService,private categoria:CategoriaService,private concurso:ConcursoService) {
   }
  ngOnInit(): void {
    this.concurso.listar().subscribe((data:any)=>{
      this.concursos=data;
    });
  }  
  ide=null;
  listar_concurso(id){
    this.fequipo=0;
    this.cuenta=false;
    this.fboton=true;
    this.ide=id;
    this.equipo.listar_concurso(id).subscribe((data:any)=>{
      this.equipos=data;
      console.log(this.equipos);
    });
  }
  n(){
    return 15;
  }
  archivo(){
    const binaryData=[];
    binaryData.push(this.s);
    const filepath=window.URL.createObjectURL(new Blob(binaryData));
    const script=document.createElement('a');
    script.href=filepath;
    script.setAttribute('download','scritp.txt');
    document.body.appendChild(script);
    script.click();
    this.toast.success('Archivo Descargado Exitosamente');
    // console.log(this.equipos);
    this.equipo.rango(this.equipos,this.ide).subscribe((data:any)=>{
        this.equipos=data;
        console.log(this.equipos);
    });
  }
  prueba(){
    this.cuenta=false;
    this.fequipo=1;
  }
  contest(){
    this.cuenta=false;
    this.fequipo=2;
  }
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
    this.fequipo=0;
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
    console.log(this.s);
    this.archivo();
  }
  // mostrar_categorias(id){
  //   this.concurso.buscar(id).subscribe((data:any)=>{
  //     this.f_con=data;
  //     // console.log(this.f_con);
  //   });
  //   this.fequi=false;
  //   this.categoria.listar_id(id).subscribe((data:any)=>{
  //     this.categorias=data;
  //   });
  // }
  // setidcat(id){
  //   this.idcat=id;
  //   this.fequi=true;
  //   this.categoria.buscar(id).subscribe((data:any)=>{
  //     this.f_cat=data;
  //   });
  // }
  mostrar_equipos(id){
    this.equipo.listar_id(id).subscribe((data:any)=>{
      this.equipos=data;
      console.log('equipos: ');
      console.log(this.equipos);
    });
  }
}
