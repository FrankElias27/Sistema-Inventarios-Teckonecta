import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private http:HttpClient) { }

  public listarCompras(){
    return this.http.get(`${baserUrl}/compra/`);
  }

  public getCompras(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/compra/page/${page}`);
  }


  public agregarCompras(compra:any){
    return this.http.post(`${baserUrl}/compra/`,compra);
  }


  public eliminarCompras(compraId:any){
    return this.http.delete(`${baserUrl}/compra/${compraId}`);
  }

  public obtenerCompra(compraId:any){
    return this.http.get(`${baserUrl}/compra/${compraId}`);
  }

  public actualizarCompras(compra:any){
    return this.http.put(`${baserUrl}/compra/`,compra);
  }

  public obtenerComprasActivos(){
    return this.http.get(`${baserUrl}/compra/activo`);
  }
}
