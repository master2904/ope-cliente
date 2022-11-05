import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  listar_id(id){    
    return this.http.get(`${this.base}maquina/buscar/`+id);
  }
  listar(id,id1){
    return this.http.get(`${this.base}maquina/listado/`+id+"/"+id1);
  }
  baja(form){
    return this.http.post(`${this.base}maquina/baja`,form);
  }
  rango(form){
    return this.http.post(`${this.base}maquina/rango`,form);
  }
  alta(id){
    return this.http.delete(`${this.base}maquina/alta/`+id);
  }
  buscar(id){
    return this.http.get(`${this.base}maquina/`+id);
  }
  generar(form){
    // console.log(`${this.base}maquina/conjunto/`+id+"/"+n)
    return this.http.post(`${this.base}maquina/generar/`,form);
  }
  nuevo(form){
    console.log(form);
    return this.http.post(`${this.base}maquina`,form);
  }
  eliminar(id){
    console.log(id);
    return this.http.delete(`${this.base}maquina/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}maquina/`+id, form);
  }  
}
