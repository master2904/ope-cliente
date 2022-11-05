import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  base=environment.base;
  constructor( private http:HttpClient) { }
  listar(){
    return this.http.get(`${this.base}usuario`);
  }
  buscar(id){
    return this.http.get(`${this.base}usuario/`+id);
  }
  nuevo(form){
    console.log(form);
    return this.http.post(`${this.base}usuario`,form);
  }
  eliminar(id){
    console.log(id);
    return this.http.delete(`${this.base}usuario/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}usuario/`+id, form);
  }  
  onUpload(file,nombre:string):Observable<any>{
    const fd= new FormData;
    fd.append('image',file,nombre);
    return this.http.post(`${this.base}usuario/imagen`,fd); 
  }  
  cargar(nombre){
    return this.http.get(`${this.base}usuario/imagen/`+nombre); 
  }
}