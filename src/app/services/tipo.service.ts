import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  listar(id){
    // console.log(id);
    return this.http.get(`${this.base}tipo/lista/`+id);
  }
  buscar(id){
    return this.http.get(`${this.base}tipo/`+id);
  }
  nuevo(form){
    return this.http.post(`${this.base}tipo`,form);
  }
  remove(id){
    return this.http.delete(`${this.base}tipo/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}tipo/`+id, form);    
  }
}
