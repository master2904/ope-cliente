import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { ImagenService } from './imagen.service';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  listar(){
    return this.http.get(`${this.base}laboratorio`);
  }
  buscar(id){
    return this.http.get(`${this.base}laboratorio/`+id);
  }
  nuevo(form){
    return this.http.post(`${this.base}laboratorio`,form);
  }
  remove(id){
    return this.http.delete(`${this.base}laboratorio/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}laboratorio/`+id, form);    
  }
  onUpload(file,nombre:string):Observable<any>{
    const fd= new FormData;
    fd.append('image',file,nombre);
    return this.http.post(`${this.base}laboratorio/imagen`,fd); 
  }
  imagen(){
    return this.base+'laboratorio/imagen/';
  }
}
