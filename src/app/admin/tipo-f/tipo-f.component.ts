import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { ProductoService } from 'src/app/services/Producto.service';
import { TipoService } from 'src/app/services/tipo.service';
import { environment } from 'src/environments/environment.prod';
import { CrearTipoComponent } from './crear-tipo/crear-tipo.component';
import { EditarTipoComponent } from './editar-tipo/editar-tipo.component';
import { Formulario } from './formulario';

@Component({
  selector: 'app-tipo-f',
  templateUrl: './tipo-f.component.html',
  styleUrls: ['./tipo-f.component.scss']
})
export class TipoFComponent implements OnInit {
  title = 'Producto';
  f_productos ={id:null,nombre:null,imagen:null}; 
  productos =[];
  tipos=[];
  base=environment.base+'producto/imagen/';

  llenar_imagen(img){    
    return this.base+img;
  }
  constructor(private producto:ProductoService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog,private tipo:TipoService) { 
  }
  ngOnInit(): void {
    this.producto.listar(1).subscribe((data:any)=>{
      this.productos=data;
      console.log(this.productos);
    });
  }
  flat=false;
  id=0;
  mostrar_detalle(p){
    this.id=p.id;
    this.flat=true;
    this.producto.buscar(p.id).subscribe((data:any)=>{
      this.f_productos=data;
    });
    this.tipo.listar(p.id).subscribe((data:any)=>{
      this.tipos=data;
      console.log(this.tipos)
    });
    
  }
  filterpost=[];
  public form={id:null,aula:null,maquinas:null,columnas:null,jefe_labo:null,imagen:null,created_at:null,updated_at:null};
  agregar() {
    let data: Formulario;
    const dialogo1 = this.dialog.open(CrearTipoComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
       this.nuevo(art.value);
       else
       this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  actualizar(lab) {
    const dialogo1 = this.dialog.open(EditarTipoComponent, {data:lab});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
        this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  nuevo(datos){
    let form=datos;
    let formulario:Formulario;
    formulario=new Formulario(0,this.id,form.descripcion);
    console.log(formulario);
    
    this.tipo.nuevo(formulario).subscribe((data:any)=>{      
      this.tipos=data;
      this.toastr.success("Categoria Creada",'Exito!');
    },
    error=>{
      this.toastr.error("No se pudo agregar la Categoria",'Error!');
      console.log(error.error);
    });
  }
  remove(id): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar esta Categoria?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.tipo.remove(id).subscribe((data:any)=>{
          this.tipos=data;
        });          
        this.toastr.success('Categoria Eliminada','')
      } else {
        this.toastr.info('Operacion Cancelada','');
      }
    });
  }
  update(datos) {
    let form=datos;
    let formulario:Formulario;
    formulario=new Formulario(form.id,form.id_producto,form.descripcion);
    this.tipo.update(formulario.id,formulario).subscribe((data:any)=>{
        this.toastr.success("Producto Actualizado",'Exito!');
        this.tipos=data;
      });       
  }
}