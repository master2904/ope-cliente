import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ColegioService } from 'src/app/services/colegio.service';
import { ConcursoService } from 'src/app/services/concurso.service';

@Component({
  selector: 'app-ganadores',
  templateUrl: './ganadores.component.html',
  styleUrls: ['./ganadores.component.scss']
})
export class GanadoresComponent implements OnInit {

  pie=0;
  mostrar=false;
  
  view: any[] = [800, 300];
  single = []
  categorias=[];
  colores=[];
  cate=[];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Colegios';
  showYAxisLabel = true;
  yAxisLabel = ' #Equipos';

  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
concursos=[];
  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }
  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  fcon=null;
  constructor(private colegio:ColegioService, private concurso:ConcursoService,private categoria:CategoriaService) { }
  winer=[];
  barra(){
    this.pie=1;
    this.view = [900, 500];
    this.colegio.r_ganadores(this.fcon.id).subscribe((data:any)=>{
      this.winer=data;
    });
    this.colegio.r_equipo(this.fcon.id).subscribe((data:any)=>{
      console.log(data)
      this.single=[];
      this.colorScheme.domain=[];
      data.forEach(valor => {
        let x={"name":valor.name,"value":valor.value}
        this.single.push(x);
        this.colorScheme.domain.push(valor.color);
      });
    });
  }
  torta(){
    this.pie=2;
    this.categorias=[];
    this.colores=[];
    this.view = [600, 300];
    this.categoria.listar_id(this.fcon.id).subscribe((data:any)=>{
      this.cate=data;
      console.log(this.cate)
      this.cate.forEach(c => {
        this.colegio.r_ganadores(c.id).subscribe((data:any)=>{
          // console.log(data)
          this.single=[];
          this.colorScheme.domain=[];
          data.forEach(valor => {
            let x={"name":valor.name,"value":valor.value}
            this.single.push(x);
            this.colorScheme.domain.push(valor.color);
          });
          this.categorias.push(this.single);
          this.colores.push(this.colorScheme);
          // console.log(this.categorias)
        });        
      });
    });
  }
  listar(c){
    this.mostrar=true;
    this.fcon=c;
    this.barra();
    // this.torta();
  }
  ngOnInit(): void {
    this.concurso.listar().subscribe((data:any)=>{
      this.concursos=data;
    });

  //   this.colegio.r_categoria(7).subscribe((data:any)=>{
  //     this.single=[];
  //     this.colorScheme.domain=[];
  //     data.forEach(valor => {
  //       let x={"name":valor.name,"value":valor.value}
  //       this.single.push(x);
  //       this.colorScheme.domain.push(valor.color);
  //     });
  //     this.categorias.push(this.single);
  //     this.colores.push(this.colorScheme);
  //   });

  //   this.colegio.r_categoria(8).subscribe((data:any)=>{
  //     this.single=[];
  //     this.colorScheme.domain=[];
  //     data.forEach(valor => {
  //       let x={"name":valor.name,"value":valor.value}
  //       this.single.push(x);
  //       this.colorScheme.domain.push(valor.color);
  //     });
  //     this.categorias.push(this.single);
  //     this.colores.push(this.colorScheme);
  //   });
  }

}
