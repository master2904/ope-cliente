import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../services/categoria.service';
import { ConcursoService } from '../../services/concurso.service';
import { formularioConcurso } from '../concurso/formularioConcurso';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { formularioCategoria } from './formularioCategoria';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  filterpost=[];
  id_concurso=0;
  agregar() {
    let datos=new formularioCategoria(0,this.id_concurso,"","");
    const dialogo1 = this.dialog.open(CrearCategoriaComponent, {data:datos});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
      this.nuevo(art.value);
    }
    );
  }
  editar(datos) {
    const dialogo1 = this.dialog.open(EditarCategoriaComponent, {data:datos});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
      this.update(art.value);
    }
    );
  }
  concurso:formularioConcurso;
  concursos=[];
  categorias=[];
  cat=null;
  constructor(private categoria:CategoriaService,private con:ConcursoService,private toastr:ToastrService,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.con.listar().subscribe((data:any)=>{
      this.concursos=data;
    });
  }
  listar_id(datos){
    this.id_concurso=datos.id;
    this.concurso=datos;
    this.cat=true;
    this.categoria.listar_id(datos.id).subscribe((data:any)=>{
      this.categorias=data;
    });
  }
  nuevo(datos){
    let formulario= new formularioCategoria(0,datos.id_concurso,datos.titulo,datos.descripcion);
    console.log(formulario);
    this.categoria.nuevo(formulario).subscribe((data:any)=>{
      this.categorias=data;
      this.toastr.success("Categoria Creada",'Exito!');
    });
  }
  eliminar(id){
    this.categoria.eliminar(id).subscribe((data:any)=>{
      this.toastr.warning("Categoria Eliminada",'Exito!')      
      this.categorias=data;
    });
  }
  update(datos) {
    let formulario= new formularioCategoria(datos.id,datos.id_concurso,datos.titulo,datos.descripcion);
    console.log(formulario);
    this.categoria.update(formulario.id, formulario).subscribe((data:any) => {
      this.categorias=data;
      this.toastr.success("Categoria Actualizada",'Exito!');
    });
  }
}
