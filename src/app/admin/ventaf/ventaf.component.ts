import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DetalleService } from 'src/app/services/detalle.service';

@Component({
  selector: 'app-ventaf',
  templateUrl: './ventaf.component.html',
  styleUrls: ['./ventaf.component.scss']
})
export class VentafComponent implements OnInit {

  title = 'Producto';
  f_productos ={id:null,nombre:null,imagen:null}; 
  f_tipos ={id:null,id_producto:null,descripcion:null}; 
  ventas =[];
  detalles=[];
  constructor(private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog,private detalle:DetalleService) { 
  }
  ngOnInit(): void {
    this.detalle.listar_ventas(1).subscribe((data:any)=>{
      this.detalles=data;
      console.log(data);
      
    });
  }
  flat=false;
  flat2=false;
  alerta(a,b){
    return a<=b;
  }
  id_t:0;
  filterpost=[];
  public form={id:null,codigo:null,id_tipo:null,descripcion:null,cantidad:null,precio_compra:null,precio_venta:null,stock_minimo:null,created_at:null,updated_at:null};
}
