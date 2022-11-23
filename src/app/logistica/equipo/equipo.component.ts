import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ColegioService } from 'src/app/services/colegio.service';
import { ConcursoService } from 'src/app/services/concurso.service';
import { EquipoService } from '../../services/equipo.service';
import { ImagenService } from '../../services/imagen.service';
import { CrearEquipoComponent } from './crear-equipo/crear-equipo.component';
import { EditarEquipoComponent } from './editar-equipo/editar-equipo.component';
import { FormularioEquipo } from './formulario-equipo';
@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})
export class EquipoComponent implements OnInit {
  concursos=[];  
  categorias=[];
  equipos=[];
  idcat=null;
  ide=null;
  fcat=null;
  fequi=null;
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
  formulario:FormularioEquipo;  
  id_categoria:number;
  createFormGroupFile(){
    return new FormGroup({
      file:new FormControl('',[Validators.required])
    });
  }
  formulario2:FormGroup;
  listado:FormGroup;
  get file(){return this.listado.get('file');}
  get nombre2(){return this.formulario2.get('nombre'); }
  get colegio2(){return this.formulario2.get('colegio'); }
  get cuenta2(){return this.formulario2.get('cuenta'); }
  get clave2(){return this.formulario2.get('clave'); }  
  filterpost=[];
  colegios=[];
  cuentas(cuenta){
    return cuenta=="_"? "":cuenta;
  }
  llenar_imagen(img){
    if(img=="")
      return "../../../assets/images/ope.png";
    return this.concurso.imagen()+img;
  }
  agregar() {
    let data: FormularioEquipo;
    const dialogConfig = new MatDialogConfig();
      dialogConfig.data={data,c:this.colegios};
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      
    const dialogo1 = this.dialog.open(CrearEquipoComponent, dialogConfig);
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.nuevo(art.value);
      else
        this.toast.info('Operacion Cancelada')
    }
    );
  }
  editar(datos) {
    let data: FormularioEquipo;
    const dialogo1 = this.dialog.open(EditarEquipoComponent, {data:datos});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
        this.toast.info('Operacion Cancelada')
    }
    );
  }
  constructor(private toast:ToastrService,private equipo:EquipoService,private categoria:CategoriaService,private concurso:ConcursoService,private imagen:ImagenService,private dialog:MatDialog,private colegio:ColegioService,private dialogo:MatDialog) {
  }
  ngOnInit(): void {
    this.colegio.listar().subscribe((data:any)=>{
      this.colegios=data;
      // console.log(this.colegios);
      this.colegios.splice(0,2);
    });
    this.concurso.activo().subscribe((data:any)=>{
      this.concursos=data[0];
      this.categorias=data[1];
      // console.log(this.concursos)
    });
    this.fcat=true;
    // this.fprob=false;
    // this.concurso.listar().subscribe((data:any)=>{
    //   this.concursos=data;
    // });
  }  
  id_max=null;
  mostrar_categorias(datos){
    this.f_con=datos;
    this.fcat=true;
    this.fequi=false;
    this.categoria.listar_id(datos.id).subscribe((data:any)=>{
      this.categorias=data;
    });  
  }
  // maximo(){
  //   this.categoria.maximo(0).subscribe((data:any)=>{
  //     this.id_max=data[0].maximo;
  //     // console.log(data);
  //   });
  // }
  mostrar_equipos(datos){
    this.f_cat=datos;
    this.fequi=true;
    this.idcat=datos.id;
    this.id_categoria=datos.id;
    this.equipo.listar_id(datos.id).subscribe((data:any)=>{
      this.equipos=data;
    });
  }
  nuevo(datos){
    this.formulario=new FormularioEquipo(0,datos.nombre,datos.id_colegio,datos.cuenta,datos.clave,this.id_categoria);
    console.log(this.formulario);
    this.equipo.nuevo(this.formulario).subscribe((data:any)=>{
      this.equipos=data;
      // console.log(data);
    });
    this.toast.success('Equipo creado exitosamente','Exito!');
  }
  eliminar(id){
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Usuario?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.equipo.eliminar(id,this.idcat).subscribe((data:any)=>{
          this.equipos=data;
          console.log(this.equipos);
        });
        this.toast.success('Equipo eliminado exitosamente');
      }
      else
        this.toast.info('Operacion cancelada')
    })
  }
  
  update(datos){
    this.formulario=new FormularioEquipo(datos.id,datos.nombre,datos.colegio,datos.cuenta,datos.clave,this.id_categoria);
    console.log(this.formulario);
    this.equipo.update(datos.id,this.formulario).subscribe((data:any)=>{
      this.equipos=data;
    });
    this.toast.success('Problema Actualizado','Exito!');
  } 
  lista:File=null;
  nombre_lista=null;
  // cargar(event){
  //   this.lista=<File>event.target.files[0];
  //   const ext=this.lista.name.split('.')[1];
  //   this.nombre_lista="lista"+"."+ext;
  //   // console.log(this.nombre_lista);
  // }
  // enviar(){
  //   this.equipo.onUpload(this.lista,this.nombre_lista).subscribe(data=>{
  //     this.equipos=data;
  //     console.log(data);
  //   },
  //   error=>{
  //     console.log(error.error);
  //   }); 
  // }

  f_imagen=null;
  fileEvent(e){
    console.log("target: ");
    console.log(e);
    this.f_imagen=e.target.files[0];
  }
  subirArchivo(){
    // this.imagen.subir(this.f_imagen).subscribe((data:any)=>{
    //   console.log(data);
    // });
  }
}
