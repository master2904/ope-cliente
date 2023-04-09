import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { ProductoService } from 'src/app/services/Producto.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { TipoService } from 'src/app/services/tipo.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  title = 'Producto';
  f_productos ={id:null,nombre:null,imagen:null}; 
  f_tipos ={id:null,id_producto:null,descripcion:null}; 
  productos =[];
  tipos =[];
  detalles=[];
  base=environment.base+'producto/imagen/';

  llenar_imagen(img){    
    return this.base+img;
  }
  constructor(private producto:ProductoService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog,private detalle:DetalleService,private tipo:TipoService) { 
  }
  ngOnInit(): void {
    this.producto.listar(1).subscribe((data:any)=>{
      this.productos=data;
      console.log(this.productos);
    });
  }
  flat=false;
  flat2=false;
  alerta(a,b){
    return a<=b;
  }
  id_t:0;
  mostrar_tipo(p){
    this.flat=true;
    this.id_t=p.id;
    this.producto.buscar(p.id).subscribe((data:any)=>{
      this.f_productos=data;
    });
    this.tipo.listar(p.id).subscribe((data:any)=>{
      this.tipos=data;
      console.log(this.tipos)
    }); 
  }
  mostrar_detalle(t){
    this.flat2=true;
    this.f_tipos=t;
    this.detalle.listar(t.id).subscribe((data:any)=>{
      this.detalles=data;
      console.log(this.detalles)
    }); 
  }
  filterpost=[];
  public form={id:null,codigo:null,id_tipo:null,descripcion:null,cantidad:null,precio_compra:null,precio_venta:null,stock_minimo:null,created_at:null,updated_at:null};
}
