import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http:HttpClient) { }

  public listarPedidos(){
    return this.http.get(`${baserUrl}/pedido/`);
  }

  public agregarPedidos(pedidos:any){
    return this.http.post(`${baserUrl}/pedido/`,pedidos);
  }

  public eliminarPedidos(pedidoId:any){
    return this.http.delete(`${baserUrl}/pedido/${pedidoId}`);
  }

  public obtenerPedidos(pedidoId:any){
    return this.http.get(`${baserUrl}/pedido/${pedidoId}`);
  }

  public actualizarPedidos(pedido:any){
    return this.http.put(`${baserUrl}/pedido/`,pedido);
  }

  public obtenerPedidosActivos(){
    return this.http.get(`${baserUrl}/v/activo`);
  }

}
