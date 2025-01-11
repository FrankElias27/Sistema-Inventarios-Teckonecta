import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http:HttpClient) { }

  public listarInventario(){
    return this.http.get(`${baserUrl}/inventario/`);
  }

  public listarInventarioDetalle(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/inventario/`);
  }

  public getInventarios(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/inventario/page/${page}`);
  }

  public agregarInventario(inventario:any){
    return this.http.post(`${baserUrl}/inventario/`,inventario);
  }

  public obtenerInventarios(inventarioId:any){
    return this.http.get(`${baserUrl}/inventario/${inventarioId}`);
  }

  public actualizarInventario(inventario:any){
    return this.http.put(`${baserUrl}/inventario/`,inventario);
  }

  public eliminarInventario(inventarioId:any){
    return this.http.delete(`${baserUrl}/inventario/${inventarioId}`);
  }
}
