import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsesorVentaService {

  constructor(private http: HttpClient) { }

  public listarDetalleAsesores(proveedorId:any){
    return this.http.get(`${baserUrl}/asesorventa/proveedor/todos/${proveedorId}`);
  }

  public agregarAsesorVenta(asesorVenta: any) {
    return this.http.post(`${baserUrl}/asesorventa/`, asesorVenta);
  }

  public eliminarAsesorVenta(asesorVentaId: any) {
    return this.http.delete(`${baserUrl}/asesorventa/${asesorVentaId}`);
  }

  public listarAsesoresVenta() {
    return this.http.get(`${baserUrl}/asesorventa/`);
  }

  public listarAsesorVentaDetalle(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/asesorventa/`);
  }

  public getAsesoresVenta(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/asesorventa/page/${page}`);
  }

  public obtenerAsesorVenta(asesorVentaId: any) {
    return this.http.get(`${baserUrl}/asesorventa/${asesorVentaId}`);
  }

  public actualizarAsesorVenta(asesorVenta: any) {
    return this.http.put(`${baserUrl}/asesorventa/`, asesorVenta);
  }

}
