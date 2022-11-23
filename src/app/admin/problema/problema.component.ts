import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { ProblemaService } from 'src/app/services/problema.service';
import { CategoriaService } from '../../services/categoria.service';
import { ConcursoService } from '../../services/concurso.service';
import { CrearProblemaComponent } from './crear-problema/crear-problema.component';
import { EditarProblemaComponent } from './editar-problema/editar-problema.component';
import { FormularioProblema } from './formulario-problema';
@Component({
  selector: 'app-problema',
  templateUrl: './problema.component.html',
  styleUrls: ['./problema.component.scss']
})
export class ProblemaComponent implements OnInit {
  constructor(private toast:ToastrService,private problema:ProblemaService,private categoria:CategoriaService,private concurso:ConcursoService,private dialog:MatDialog,private dialogo:MatDialog) { }
  concursos=[];  
  categorias=[];
  problemas=[];
  id_categoria=null;
  formulario:FormularioProblema;
  errores=null;
  fcat=null;
  fprob=null;
  f_cat=[];
  f_con=[];
  agregar() {
    let data: FormularioProblema;
    const dialogo1 = this.dialog.open(CrearProblemaComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.nuevo(art.value);
      else
        this.toast.info('Operacion Cancelada');
    }
    );
  }
  editar(datos) {
    const dialogo1 = this.dialog.open(EditarProblemaComponent, {data:datos});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
        this.toast.info('Operacion Cancelada');
    }
    );
  }
  ngOnInit(): void {
    this.concurso.listar().subscribe((data:any)=>{
      this.concursos=data;
    });
  }  
  mostrar_categorias(datos){
    this.f_con=datos;
    this.fcat=true;
    this.fprob=false;
    this.categoria.listar_id(datos.id).subscribe((data:any)=>{
      this.categorias=data;
    });
  }
  mostrar_problemas(datos){
    this.id_categoria=datos.id;
    this.fprob=true;
    this.f_cat=datos;
    this.problema.listar_id(datos.id).subscribe((data:any)=>{
      this.problemas=data;
      console.log('problemas: ');
      console.log(this.problemas);
    },
    error=>{
      this.errores=error;
    }
    );
  }
  nuevo(datos){
    this.formulario=new FormularioProblema(0,datos.alias,datos.titulo,0,datos.dificultad,datos.autor,datos.color);
    this.formulario.id_categoria=this.id_categoria;
    console.log(this.formulario);
    this.problema.nuevo(this.formulario).subscribe((data:any)=>{
      this.problemas=data;
    });
    this.toast.success('Problema creado exitosamente');
  }
  eliminar(id){
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Usuario?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.problema.eliminar(id,this.id_categoria).subscribe((data:any)=>{
          this.problemas=data;      console.log(this.problemas);
        });
        this.toast.success('Problema eliminado exitosamente','Exito!');
      }});
  }
  update(datos){
    this.formulario=new FormularioProblema(datos.id,datos.alias,datos.titulo,datos.id_categoria,datos.dificultad,datos.autor,datos.color);
    // this.formulario.id_categoria=this.id_categoria;
    this.problema.update(datos.id,this.formulario).subscribe((data:any)=>{
      this.problemas=data;
    });
    this.toast.success('Problema Actualizado','Exito!');
  }
}
