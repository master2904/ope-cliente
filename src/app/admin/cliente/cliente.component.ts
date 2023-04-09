import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Formulario } from './formulario';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  clientes=[];
  constructor(private cliente:ClienteService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog) { 
  }
  ngOnInit(): void {
    this.cliente.listar().subscribe((data:any)=>{
      this.clientes=data;
      console.log(this.clientes);
    });
  }
  filterpost=[];
  public form={id:null,codigo:null,id_tipo:null,descripcion:null,cantidad:null,precio_compra:null,precio_venta:null,stock_minimo:null,created_at:null,updated_at:null};
  agregar() {
    let data: Formulario;
    const dialogo1 = this.dialog.open(CrearClienteComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
       this.nuevo(art.value);
       else
       this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  cambiar(lab) {
    const dialogo1 = this.dialog.open(EditarClienteComponent, {data:lab});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
        this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  nuevo(datos){
    let form=datos;
    let formulario:Formulario;
    formulario=new Formulario(0,form.nit,form.nombre,form.apellido);    
    console.log(formulario)

    this.cliente.nuevo(formulario).subscribe((data:any)=>{
      this.clientes=data;
      this.toastr.success("Cliente Agregado",'Exito!');
    },
    error=>{
      this.toastr.error("No se pudo agregar el Item",'Error!');
      // console.log(error.error);
    });
  }
  remove(id): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Producto?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.cliente.remove(id).subscribe((data:any)=>{
          this.clientes=data;
        });          
        this.toastr.success('Producto Eliminado','')
      } else {
        this.toastr.info('Operacion Cancelada','');
      }
    });
  }
  update(datos) {
    let form=datos;
    let formulario:Formulario;
    formulario=new Formulario(form.id,form.nit,form.nombre,form.apellido);
    this.cliente.update(formulario.id,formulario).subscribe((data:any)=>{
        this.toastr.success("Item Actualizado",'Exito!');
        this.clientes=data;
      });       
  }

}
