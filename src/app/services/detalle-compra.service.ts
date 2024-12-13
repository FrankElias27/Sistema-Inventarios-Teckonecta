import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {

  constructor(private http:HttpClient) { }

  public listarDetalleCompra(compraId:any){
    return this.http.get(`${baserUrl}/detallecompra/compra/todos/${compraId}`);
  }

  public guardarDetalleCompra(detallecompra:any){
    return this.http.post(`${baserUrl}/detallecompra/`,detallecompra);
  }

  public eliminarDetalle(detalleId:any){
    return this.http.delete(`${baserUrl}/detallecompra/${detalleId}`);
  }
}
