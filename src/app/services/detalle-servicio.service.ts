import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DetalleServicioService {

  constructor(private http:HttpClient) { }

  public listarDetalleServicio(cotizacionId:any){
    return this.http.get(`${baserUrl}/detalleservicios/cotizacion/todos/${cotizacionId}`);
  }

  public guardarDetalleServicio(detalleservicio:any){
    return this.http.post(`${baserUrl}/detalleservicios/`,detalleservicio);
  }

  public eliminarDetalle(detalleId:any){
    return this.http.delete(`${baserUrl}/detalleservicios/${detalleId}`);
  }
}
