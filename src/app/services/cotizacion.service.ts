import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  constructor(private http:HttpClient) { }

  public listarCotizaciones(){
    return this.http.get(`${baserUrl}/cotizacion/`);
  }

  public getCotizaciones(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/cotizacion/page/${page}`);
  }


  public agregarCotizaciones(cotizacion:any){
    return this.http.post(`${baserUrl}/cotizacion/`,cotizacion);
  }


  public eliminarCotizaciones(cotizacionId:any){
    return this.http.delete(`${baserUrl}/cotizacion/${cotizacionId}`);
  }

  public obtenerCotizacion(cotizacionId:any){
    return this.http.get(`${baserUrl}/cotizacion/${cotizacionId}`);
  }

  public actualizarCotizacion(cotizacion:any){
    return this.http.put(`${baserUrl}/cotizacion/`,cotizacion);
  }

  public obtenerCotizacionActivos(){
    return this.http.get(`${baserUrl}/v/activo`);
  }
}
