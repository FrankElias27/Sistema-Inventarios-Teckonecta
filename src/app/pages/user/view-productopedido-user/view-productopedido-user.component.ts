import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductopedidoService } from './../../../services/productopedido.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-productopedido-user',
  templateUrl: './view-productopedido-user.component.html',
  styleUrls: ['./view-productopedido-user.component.css']
})
export class ViewProductopedidoUserComponent implements OnInit {

  pedidoId:any;
  cliente:any;
  productopedido:any = [];

  constructor(private route:ActivatedRoute,private productopedidoService:ProductopedidoService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.pedidoId = this.route.snapshot.params['pedidoId'];
    this.cliente = this.route.snapshot.params['cliente'];
    this.productopedidoService.listarProductoPedidoDelPedido(this.pedidoId).subscribe(
      (data:any) => {
        console.log(data);
        this.productopedido = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }



}
