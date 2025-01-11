import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http:HttpClient) { }

  public listarServicios(){
    return this.http.get(`${baserUrl}/servicio/`);
  }

  public listarServicioDetalle(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/servicio/`);
  }

  public getServicios(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/servicio/page/${page}`);
  }

  public agregarServicio(servicio:any){
    return this.http.post(`${baserUrl}/servicio/`,servicio);
  }

  public obtenerServicios(servicioId:any){
    return this.http.get(`${baserUrl}/servicio/${servicioId}`);
  }

  public actualizarServicio(servicio:any){
    return this.http.put(`${baserUrl}/servicio/`,servicio);
  }

  public eliminarServicio(servicioId:any){
    return this.http.delete(`${baserUrl}/servicio/${servicioId}`);
  }
}
