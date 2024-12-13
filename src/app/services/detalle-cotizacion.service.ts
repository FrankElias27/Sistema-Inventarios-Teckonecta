import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DetalleCotizacionService {

  constructor(private http:HttpClient) { }

  public listarDetalleCotizacion(cotizacionId:any){
    return this.http.get(`${baserUrl}/detallecotizacion/cotizacion/todos/${cotizacionId}`);
  }

  public guardarDetalleCotizacion(detallecotizacion:any){
    return this.http.post(`${baserUrl}/detallecotizacion/`,detallecotizacion);
  }

  public eliminarDetalle(detalleId:any){
    return this.http.delete(`${baserUrl}/detallecotizacion/${detalleId}`);
  }
}
