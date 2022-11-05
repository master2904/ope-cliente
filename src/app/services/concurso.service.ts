import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcursoService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  activo(){
    return this.http.get(`${this.base}concurso/activo/`+1);
  }
  listar(){
    return this.http.get(`${this.base}concurso`);
  }
  buscar(id){
    return this.http.get(`${this.base}concurso/`+id);
  }
  nuevo(form){
    console.log(form);
    return this.http.post(`${this.base}concurso`,form);
  }
  eliminar(id){
    console.log(id);
    return this.http.delete(`${this.base}concurso/`+id);
  }
  actualizar(id,form) {
    return this.http.put(`${this.base}concurso/`+id, form);
  }  
  cambio(id) {
    return this.http.get(`${this.base}concurso/`+id+"/edit");
  }  
  onUpload(file,nombre:string):Observable<any>{
    const fd= new FormData;
    fd.append('image',file,nombre);
    return this.http.post(`${this.base}concurso/imagen`,fd); 
  }

  imagen(){
    return this.base+'concurso/imagen/';
  }
}
