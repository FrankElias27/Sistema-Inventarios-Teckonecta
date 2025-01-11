import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http:HttpClient) { }

  public listarVentas(){
    return this.http.get(`${baserUrl}/venta/`);
  }

  public getVentas(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/venta/page/${page}`);
  }


  public agregarVentas(venta:any){
    return this.http.post(`${baserUrl}/venta/`,venta);
  }


  public eliminarVentas(ventaId:any){
    return this.http.delete(`${baserUrl}/venta/${ventaId}`);
  }

  public obtenerVenta(ventaId:any){
    return this.http.get(`${baserUrl}/venta/${ventaId}`);
  }

  public actualizarVentas(venta:any){
    return this.http.put(`${baserUrl}/venta/`,venta);
  }

  public obtenerPedidosActivos(){
    return this.http.get(`${baserUrl}/v/activo`);
  }

  public procesarVenta(ventaId: number, inventarioId: number): Observable<any> {
    return this.http.post(`${baserUrl}/venta/${ventaId}/procesar/${inventarioId}`, {});
  }
}
