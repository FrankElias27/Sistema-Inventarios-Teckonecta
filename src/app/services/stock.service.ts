import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }

  public getInventarioStock(inventarioId: number, page: number): Observable<any> {
    return this.http.get(`${baserUrl}/stock/${inventarioId}/page/${page}`);
  }

  public eliminarStock(stockId:any){
    return this.http.delete(`${baserUrl}/stock/${stockId}`);
  }

  public agregarStock(stock:any){
    return this.http.post(`${baserUrl}/stock/`,stock);
  }

  public obtenerStock(stockId:any){
    return this.http.get(`${baserUrl}/stock/${stockId}`);
  }

  public actualizarStock(stock:any){
    return this.http.put(`${baserUrl}/stock/`,stock);
  }
}
