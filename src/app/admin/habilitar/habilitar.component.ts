import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import { environment } from 'src/environments/environment.prod';
import { EquipoService } from '../../services/equipo.service';
import { ConcursoService } from '../../services/concurso.service';
import { MaquinaService } from '../../services/maquina.service';
import { ColegioService } from 'src/app/services/colegio.service';

@Component({
  selector: 'app-habilitar',
  templateUrl: './habilitar.component.html',
  styleUrls: ['./habilitar.component.scss']
})
export class HabilitarComponent implements OnInit {
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
  cambio(col){
    if(col.estado==0)
      this.baja(col)
    else
      this.alta(col)
  }
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
  baja(m){
    let f={
      "estado": null, 
      "id_concurso": null,
      "id_equipo": null,
      "id_laboratorio": null,
      "nombre": null,
      "numero": null
    }  
    this.maquinas=[];
    const x=this.laboratorio.columnas;
    const n=this.laboratorio.maquinas/x;
    let maq=[];
    m.estado=-1;
    f.estado=m.estado;
    f.id_concurso=m.id_concurso;
    f.id_equipo=m.id_equipo;
    f.id_laboratorio=m.id_laboratorio;
    f.nombre=m.nombre;
    f.numero=m.numero;
    // console.log(f);
    this.maquina.baja(f).subscribe((data:any)=>{
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
    // this.equipo.listar_concurso(id).subscribe((data:any)=>{
    //   this.equipos=data;
    // });
    
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
      // console.log(this.equipos);
    });
  }

  constructor(private maquina:MaquinaService,private labo:LaboratorioService,private toastr:ToastrService, private equipo:EquipoService, private concurso:ConcursoService,private colegio:ColegioService) { }
  ngOnInit(): void {
    // this.colegio.listar().subscribe((data:any)=>{
      // this.colegios=data;
      // console.log(this.colegios);
    // }); 
    this.labo.listar().subscribe((data:any)=>{
      this.laboratorios=data;
    });
    this.concurso.listar().subscribe((data:any)=>{
      this.concursos=data;
    });
  
  }
  bus_lab(lab){
    // this.imagen=true;
    // this.labo.buscar(id).subscribe((data:any)=>{
      this.laboratorio=lab;
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
      // console.log(maq);
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
  });
  }
}
