import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  score(id){    
    return this.http.get(`${this.base}detalle/score/`+id);
  }
  buscar(id){
    return this.http.get(`${this.base}problema/`+id);
  }
  nuevo(form){
    // console.log(form);
    return this.http.post(`${this.base}detalle`,form);
  }
  eliminar(form){
    // console.log(id);
    return this.http.post(`${this.base}detalle/delete`,form);
  }
}
