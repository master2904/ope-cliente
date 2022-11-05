import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProblemaService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  listar_id(id){    
    return this.http.get(`${this.base}problema/buscar/`+id);
  }
  listar(){
    return this.http.get(`${this.base}problema`);
  }
  buscar(id){
    return this.http.get(`${this.base}problema/`+id);
  }
  nuevo(form){
    // console.log(form);
    return this.http.post(`${this.base}problema`,form);
  }
  eliminar(id,id_cat){
    // console.log(id);
    return this.http.delete(`${this.base}problema/eliminar/`+id+"/"+id_cat);
  }
  update(id,form) {
    return this.http.put(`${this.base}problema/`+id, form);
  }
  onUpload(file,nombre:string):Observable<any>{
    const fd= new FormData;
    fd.append('file',file,nombre);
    return this.http.post(`${this.base}laboratorio/file`,fd); 
  }
}
