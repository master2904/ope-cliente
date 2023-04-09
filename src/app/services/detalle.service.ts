import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  base=environment.base;
  constructor(private http:HttpClient) { }
  listar(id){
    return this.http.get(`${this.base}detalle/lista/`+id);
  }
  listar_ventas(id){
    return this.http.get(`${this.base}detalle/venta/`+id);
  }
  buscar(id){
    return this.http.get(`${this.base}detalle/`+id);
  }
  nuevo(form){
    return this.http.post(`${this.base}detalle`,form);
  }
  remove(id){
    return this.http.delete(`${this.base}detalle/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}detalle/`+id, form);    
  }

}