import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  listar_id(id){    
    return this.http.get(`${this.base}equipo/buscar/`+id);
  }
  score(id){    
    return this.http.get(`${this.base}equipo/score/`+id);
  }
  colegio(id){    
    return this.http.get(`${this.base}equipo/colegio/`+id);
  }
  
  listar_script(id){    
    return this.http.get(`${this.base}equipo/script/`+id);
  }
  listar_concurso(id){    
    return this.http.get(`${this.base}equipo/concurso/`+id);
  }
  listar_categorias(id){    
    return this.http.get(`${this.base}equipo/categoria/`+id);
  }
  listar(){
    return this.http.get(`${this.base}equipo`);
  }
  buscar(id){
    return this.http.get(`${this.base}equipo/`+id);
  }
  nuevo(form){
    // console.log(form);
    return this.http.post(`${this.base}equipo`,form);
  }
  rango(form,id){
    return this.http.put(`${this.base}equipo/rango/`+id,form);
  }
  finalizar(form,id){
    return this.http.put(`${this.base}equipo/finalizar/`+id,form);
  }
  eliminar(id,id_cat){
    // console.log(id);
    // return this.http.delete(`${this.base}equipo/`+id);
    return this.http.delete(`${this.base}equipo/eliminar/`+id+"/"+id_cat);
  }
  update(id,form) {
    return this.http.put(`${this.base}equipo/`+id, form);
  }
  onUpload(file,nombre:string,id):Observable<any>{
    const fd= new FormData;
    // console.log(nombre);
    fd.append('lista',file,nombre);
    fd.append('id',id);
    return this.http.post(`${this.base}equipo/lista`,fd); 
  }  

}
