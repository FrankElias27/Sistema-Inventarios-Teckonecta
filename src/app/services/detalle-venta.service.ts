import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  constructor(private http:HttpClient) { }

  public listarDetalleVenta(ventaId:any){
    return this.http.get(`${baserUrl}/detalleventa/venta/todos/${ventaId}`);
  }

  public guardarDetalleVenta(detalleventa:any){
    return this.http.post(`${baserUrl}/detalleventa/`,detalleventa);
  }

  public eliminarDetalle(detalleId:any){
    return this.http.delete(`${baserUrl}/detalleventa/${detalleId}`);
  }

}
