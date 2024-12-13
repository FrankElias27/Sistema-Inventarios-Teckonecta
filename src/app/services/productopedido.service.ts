import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProductopedidoService {

  constructor(private http:HttpClient) { }

  public listarProductoPedidoDelPedido(pedidoId:any){
    return this.http.get(`${baserUrl}/productopedido/pedido/todos/${pedidoId}`);
  }

  public guardarProductoPedido(productopedido:any){
    return this.http.post(`${baserUrl}/productopedido/`,productopedido);
  }

  public eliminarProductoPedido(productopedidoId:any){
    return this.http.delete(`${baserUrl}/productopedido/${productopedidoId}`);
  }

  public actualizarProductoPedido(pregunta:any){
    return this.http.put(`${baserUrl}/pregunta/`,pregunta);
  }

  public obtenerProductoPedido(preguntaId:any){
    return this.http.get(`${baserUrl}/pregunta/${preguntaId}`);
  }




}

