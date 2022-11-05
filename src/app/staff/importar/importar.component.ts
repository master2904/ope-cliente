import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ConcursoService } from 'src/app/services/concurso.service';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.scss']
})
export class ImportarComponent implements OnInit {
  concursos=[];  
  equipos=[];
  fequi=false;
  fcargado=false;
  id=null;
  cargar_excel(){
    this.fcargado=true;
  }
  f_con={
    titulo:null,
    gestion:null,
    fecha:null,
    hora:null
  };
  createFormGroupFile(){
    return new FormGroup({
      file:new FormControl('',[Validators.required])
    });
  }
  listado:FormGroup;
  get file(){return this.listado.get('file');}
  cuentas(cuenta){
    return cuenta=="_"? "":cuenta;
  }
  constructor(private categoria:CategoriaService, private toast:ToastrService,private equipo:EquipoService,private concurso:ConcursoService) {
  this.listado=this.createFormGroupFile();
  }
  ngOnInit(): void {
    this.concurso.listar().subscribe((data:any)=>{
      this.concursos=data;
    });
  }  
  id_categorias=null;
  categorias(id){
    this.categoria.listar_id(id).subscribe((data:any)=>{
      this.id_categorias=data;
      // console.log(data);
    });
  }
  mostrar_equipos(datos){
    this.id=datos.id;
    this.f_con=datos;
    this.fequi=true;
    this.equipo.listar_concurso(datos.id).subscribe((data:any)=>{
      this.equipos=data;
    });
    this.categorias(datos.id);
  }
  lista:File=null;
  nombre_lista=null;
  cargar(event){
    this.lista=<File>event.target.files[0];
    const ext=this.lista.name.split('.')[1];
    this.nombre_lista="lista"+"."+ext;
    // console.log(this.nombre_lista);
  }
  enviar(){
    this.equipo.onUpload(this.lista,this.nombre_lista,this.id).subscribe(data=>{
      this.equipos=data;
      // console.log(data);
      this.toast.success('Exito','Importacion exitosa');
    },
    error=>{
      this.toast.error('Revise los campos del EXCEL','Error');
      console.log(error.error);
    }); 
  }

  f_imagen=null;
  fileEvent(e){
    console.log("target: ");
    console.log(e);
    this.f_imagen=e.target.files[0];
  }
}
