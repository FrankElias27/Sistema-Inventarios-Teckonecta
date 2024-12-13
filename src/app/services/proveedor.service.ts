import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http:HttpClient) { }

  public listarProveedores(){
    return this.http.get(`${baserUrl}/proveedor/`);
  }

  public listarProveedorDetalle(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/proveedor/`);
  }

  public getProveedores(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/proveedor/page/${page}`);
  }

  public agregarProveedor(proveedor:any){
    return this.http.post(`${baserUrl}/proveedor/`,proveedor);
  }

  public obtenerProveedor(proveedorId:any){
    return this.http.get(`${baserUrl}/proveedor/${proveedorId}`);
  }

  public actualizarProveedor(proveedor:any){
    return this.http.put(`${baserUrl}/proveedor/`,proveedor);
  }

  public eliminarProveedor(proveedorId:any){
    return this.http.delete(`${baserUrl}/proveedor/${proveedorId}`);
  }
}
