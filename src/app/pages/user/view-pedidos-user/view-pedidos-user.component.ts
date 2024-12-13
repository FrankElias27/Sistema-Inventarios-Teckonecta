import  Swal  from 'sweetalert2';
import { PedidoService } from './../../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-pedidos-user',
  templateUrl: './view-pedidos-user.component.html',
  styleUrls: ['./view-pedidos-user.component.css']
})
export class ViewPedidosUserComponent implements OnInit {

  pedido : any = [
  ]

  constructor(private pedidoService:PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.listarPedidos().subscribe(
      (dato:any) => {
        this.pedido = dato;
        console.log(this.pedido);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar los producto','error');
      }
    )
  }


}
