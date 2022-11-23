import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faTruckMonster } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ColegioService } from 'src/app/services/colegio.service';
import { ConcursoService } from 'src/app/services/concurso.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import { MaquinaService } from 'src/app/services/maquina.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss']
})
export class AutoComponent implements OnInit {
  concursos=[];
  categorias=[];
  laboratorios=[];
  maquinas=[];
  equipos=[];
  laboratorios_elegidos = [];
  m_disponibles=[];
  e_categoria=[];
  fguardar=false;  
  equipos_categoria=[];
  k=0;
  n=0;
  contador=0;
  vez=false;
  flat=false;
  labos=[];
  ide=null;
  constructor(private categoria:CategoriaService, private maquina:MaquinaService,private laboratorio:LaboratorioService,private toastr:ToastrService, private equipo:EquipoService, private concurso:ConcursoService,private colegio:ColegioService,private dialog:MatDialog,private dialogo:MatDialog) { }
  ngOnInit(): void {
    this.concurso.listar().subscribe((data:any)=>{this.concursos=data;})
    this.laboratorio.listar().subscribe((data:any)=>{this.laboratorios=data;})
  }
  id_cat=0;
  listar_categorias(id){
    this.ide=id;
    this.categoria.listar_id(id).subscribe((data:any)=>{
      this.categorias=data;
      this.flat=true;
    })
    this.equipos=[];
    this.equipo.listar_categorias(id).subscribe((data:any)=>{
      this.equipos_categoria=data;
      this.equipos_categoria.forEach(cat => {
        let t=0;
        cat.forEach(e=>{
          this.equipos.push(e);
          t++;
        })
        this.e_categoria.push(t);
      });
    })
  }
  confirmar(pos){
    this.contador++;
    this.llenar_labo(this.laboratorios[pos]);
    this.laboratorios_elegidos.push(this.laboratorios[pos]);
    this.laboratorios.splice(pos,1);
  }
  quitar(pos){
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea quitar este Laboratorio?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.laboratorios.push(this.laboratorios_elegidos[pos]);
        this.n-= this.m_disponibles[pos];
        this.m_disponibles.splice(pos,1);
        this.laboratorios_elegidos.splice(pos,1);
        this.labos.splice(pos,1);
        this.contador--;
        this.k--;
        this.toastr.warning('laboratorio Removido')
      }
      else
        this.toastr.info('Operacion Cancelada');
    });
  }
  llenar_labo(lab){
    this.maquinas=[];
    const x=lab.columnas;
    const n=lab.maquinas/x;
    let maq=[];
    this.maquina.listar(this.ide,lab.id).subscribe((data:any)=>{
      maq=data;
      let c=1;
      for (let i = 0; i < n; i++) {
        const fila=[];
        for (let j = 0; j < x; j++) {
          if(c<=lab.maquinas)
            fila.push(maq[c]);
          c++;
        }
        this.maquinas.push(fila);
      }
      this.labos.push(this.maquinas);
      let aux=this.labos[this.labos.length-1];
      let l = new Laboratorio(aux);
      this.m_disponibles[this.k++]=l.n_maquinas;
      this.n+=l.n_maquinas;
    });
  } 
  limpiar(){
    for(let i=0;i<this.labos.length;i++){
      let f=this.labos[i].length;
      let c=f.length;
      for(let j=0;j<this.labos[i].length;j++){
        for(let k=0;k<this.labos[i][j].length;k++){
          if(this.labos[i][j][k].id==0){
            this.labos[i][j][k].id_colegio=0;
            this.labos[i][j][k].color="#ffffff";
            this.labos[i][j][k].id_equipo=0;
            this.labos[i][j][k].estado=0;
          }
        }
      }
    }
  }
  asignar_categoria(pos:number,inicio:number,fin:number){
    let t,t1,maquinas,veces,recorrido:number;
    t=0;
    t1=0;
    veces=0;
    t=0;
    let n_equipos=this.equipos_categoria[pos].length;
    let eq=this.equipos_categoria[pos];
    let j=inicio;
    while(j<fin){
      let l:Laboratorio;
      l=new Laboratorio(this.labos[j]);
      maquinas=l.n_maquinas;
      recorrido=Math.min(n_equipos,maquinas);
      console.log(n_equipos,maquinas);
      while(recorrido>0){
        let f=0,c=0;
        veces=0;
        do{
          f=Math.trunc((Math.random()*10))%l.n;
          c=Math.trunc((Math.random()*10))%l.m;
          veces++;
          // if (veces==5){
          //   j++;
          //   if(j==3){
          //     j=0;     
          //   }
          //   l=new Laboratorio(this.labos[j]);
          //   maquinas=l.n_maquinas;
          // recorrido=Math.min(n_equipos,maquinas);
          // }
        }while(l.verificar(f,c,eq[t].id_colegio)==false);
        if(l.existe(f,c)){
          l.copiar(f,c,eq[t]);
          // console.log(eq[t])
          // console.log(this.labos[j][f][c]);
          
          this.labos[j][f][c].id_colegio=eq[t].id_colegio;
          this.labos[j][f][c].color=eq[t].color;
          this.labos[j][f][c].id_equipo=eq[t].id;
          this.labos[j][f][c].estado=1;
          t++;
          // console.log("Labo: ",j,"[",f,"][",c,"]->",this.labos[j][f][c].numero);
          maquinas--;
          n_equipos--;
          recorrido--;
        }
      }
      j++;
    }
    // console.log(n_equipos);
    
    this.vez=true;
  }    
  guardar(){
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea quitar este Laboratorio?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
      let auto=[];
      this.labos.forEach(lab => {
        lab.forEach(fila=>{
          fila.forEach(col=>{
            if(col.id==0 && col.estado){
              auto.push(col);
            }
          });
        });
      });
      this.equipos=[];
      this.equipo.listar_categorias(this.ide).subscribe((data:any)=>{
        this.equipos_categoria=data;
        this.equipos_categoria.forEach(cat => {
          let t=0;
          cat.forEach(e=>{
            this.equipos.push(e);
            t++;
          })
          this.e_categoria.push(t);
        });
      });
      this.maquina.rango(auto).subscribe((data:any)=>{
          console.log(data);
          this.toastr.success("Asignacion Exitosa");
      },
      error=>{
        let er=error.status;
        if(er==400)
          this.toastr.error("No se pudo realizar la asignacion, revise los laboratorios","Error");
      }
      );
    }
    else
      this.toastr.info('Operacion Cancealada');
    })
  }
  asignar(pos){
    this.fguardar=true;
    console.log(this.labos)
    console.log(this.equipos_categoria);
    this.limpiar();
    this.asignar_categoria(pos,0,this.labos.length);
    
      // let n=this.labos.length;
      // let m=this.equipos_categoria.length;
      // let t=0,t1=0,i,maquinas=0,recorrido,equipos:number;
      // let veces=0;
      // // let i=0;
      // for (let i=0;i<1;i++){
      //     t=0;
      //     equipos=this.equipos_categoria[i].length;
      //     let eq=this.equipos_categoria[i];
      //     let j=t1;
      //     while(j<n){
      //     // for (let j=t1;j<3;j++){
      //         let l:Laboratorio;
      //         l=new Laboratorio(this.labos[j]);
      //         maquinas=l.n_maquinas;
      //         recorrido=Math.min(maquinas,equipos);
      //         if(equipos>maquinas){
      //             equipos-=maquinas;
      //             maquinas=0;
      //         }
      //         else{
      //             maquinas-=equipos;
      //             equipos=0;
      //         }
      //         for (let k=0;k<recorrido;k++){
      //             let f=0,c=0;
      //             veces=0;
      //             do{
      //               f=Math.trunc((Math.random()*10))%l.n;
      //               c=Math.trunc((Math.random()*10))%l.m;
      //               veces++;
      //               if (veces==5){
      //                 j++;
      //                 if(j==3)
      //                   j=0;
      //                 break;
      //               }
      //             }
      //             while(l.verificar(f,c,eq[t].id_colegio)==false);
      //             // console.log(veces)
      //             if(this.labos[j][f][c]!=undefined){
      //               l.copiar(f,c,eq,t);
      //               this.labos[j][f][c].id_colegio=eq[t].id_colegio;
      //               this.labos[j][f][c].color=eq[t].color;
      //               this.labos[j][f][c].id_equipo=eq[t++].id;
      //               this.labos[j][f][c].estado=1;
      //               // console.log(t);
      //             }
      //         }
      //         t1++;
      //         console.log(t);
              
      //         // if(equipos==0)//||l.disponibles()<((l.n*l.m)/2))
      //             // break;
      //       j++;
      //     }
      // }
      // console.log(this.labos)
    this.vez=true;
  }  
}
class Maquina{
  id:number;
  id_concurso:number;
  id_laboratorio:number;
  id_equipo:number;
  id_colegio:number;
  estado:number;
  numero:number;
  color:string;
  constructor(x){
    this.id=x.id;
    this.id_concurso=x.id_concurso;
    this.id_laboratorio=x.id_laboratorio;
    this.id_equipo=x.id_equipo;
    this.id_colegio=x.id_colegio;
    this.estado=x.estado;
    this.numero=x.numero;
    this.color=x.color;
  }
  verificar():boolean{
    if(this.estado==-1)
      return false;
    if(this.estado==1)
      return false;
    return (this.id==0 && this.estado==0);
  } 
}
class Laboratorio{
  maq:Array<Array<Maquina> > = [];
  n:number;
  m:number;
  n_maquinas:number;
  constructor(x){
    this.n_maquinas=0;
    this.n=x.length;
    this.m=x[0].length;
    let t:any;
    for(let i=0;i<this.n;i++){
      let aux:Array<Maquina>=[];
      for(let j=0;j<x[i].length;j++){
        t= new Maquina(x[i][j]);
        aux.push(t);
        if(t.verificar())
          this.n_maquinas++;
      }
      this.maq.push(aux);
    }
  }
  existe(f,c):boolean{
    // console.log(f,c)
    return !(this.maq[f][c]==undefined);
  }
  verificar(f,c,id_colegio):boolean{
    // if(this.existe(f,c))  
    //     return true;
    // arriba
    // if(f>0){
    //   if(this.maq[f-1][c].id_colegio==id_colegio)
    //     return false;
    // }
    // //abajo
    // if(f<(this.maq.length-1)){
    //   if(!this.existe(f+1,c))
    //     return false;
    //   if(this.maq[f+1][c].id_colegio==id_colegio)
    //       return false;
    // }
    // //izquierda
    // if(c>0){
    //   if(!this.existe(f,c-1))
    //     return false;
    //   if(this.maq[f][c-1].id_colegio==id_colegio)
    //     return false;
    // }
    // //derecha
    // if(c<(this.maq[f].length-1)){
    //   if(this.maq[f][c+1].id_colegio==id_colegio)
    //     return false;
    // }
    if(this.existe(f,c))
      return (this.maq[f][c].verificar());
    return false;
  }  
  
  copiar(f,c,eq){
    this.maq[f][c].id_colegio=eq.id_colegio;
    this.maq[f][c].id_equipo=eq.id_equipo;
    this.maq[f][c].color=eq.color;
    this.maq[f][c].estado=1;
  }
}