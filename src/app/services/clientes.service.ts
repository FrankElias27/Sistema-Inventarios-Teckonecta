import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient) { }

  public listarClientes(){
    return this.http.get(`${baserUrl}/cliente/`);
  }

  public listarClienteDetalle(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/cliente/`);
  }

  public getClientes(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/cliente/page/${page}`);
  }

  public agregarCliente(cliente:any){
    return this.http.post(`${baserUrl}/cliente/`,cliente);
  }

  public obtenerClientes(clienteId:any){
    return this.http.get(`${baserUrl}/cliente/${clienteId}`);
  }

  public actualizarCliente(cliente:any){
    return this.http.put(`${baserUrl}/cliente/`,cliente);
  }

  public eliminarCliente(clienteId:any){
    return this.http.delete(`${baserUrl}/cliente/${clienteId}`);
  }

}
