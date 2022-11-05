import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ColegioService {

  base=environment.base;
  constructor(private http:HttpClient) { }
  listar(){
    return this.http.get(`${this.base}colegio`);
  }
  buscar(id){
    return this.http.get(`${this.base}colegio/`+id);
  }
  nuevo(form){
    // console.log(form);
    return this.http.post(`${this.base}colegio`,form);
  }
  eliminar(id){
    // console.log(id);
    return this.http.delete(`${this.base}colegio/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}colegio/`+id, form);
  }
  r_categoria(id){
    return this.http.get(`${this.base}colegio/rcategoria/`+id);
  }
  r_concurso(id){
    return this.http.get(`${this.base}colegio/rconcurso/`+id);
  }
  r_ganadores(id){
    return this.http.get(`${this.base}colegio/ganadores/`+id);
  }
  
  r_equipo(id){
    return this.http.get(`${this.base}colegio/equipos/`+id);
  }
    
}
