import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  listar_id(id){    
    return this.http.get(`${this.base}categoria/buscar/`+id);
  }
  listar(){
    return this.http.get(`${this.base}categoria`);
  }
  // maximo(id){
  //   return this.http.get(`${this.base}categoria/maxima/`+id);
  // }
  buscar(id){
    return this.http.get(`${this.base}categoria/`+id);
  }
  conjunto(id,n,form){
    return this.http.post(`${this.base}categoria/conjunto/`+id+"/"+n,form);
  }
  nuevo(form){
    console.log(form);
    return this.http.post(`${this.base}categoria`,form);
  }
  eliminar(id){
    console.log(id);
    return this.http.delete(`${this.base}categoria/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}categoria/`+id, form);
  }
}
