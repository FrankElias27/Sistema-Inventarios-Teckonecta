import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http:HttpClient) { }

  public listarTransfer(){
    return this.http.get(`${baserUrl}/transfer/`);
  }

  public getTransfer(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/transfer/page/${page}`);
  }


  public agregarTransfer(stockTransfer:any){
    return this.http.post(`${baserUrl}/transfer/`,stockTransfer);
  }


  public eliminarTransfer(transferId:any){
    return this.http.delete(`${baserUrl}/transfer/${transferId}`);
  }

  public obtenerTransfer(transferId:any){
    return this.http.get(`${baserUrl}/transfer/${transferId}`);
  }

  public actualizarTransfer(stockTransfer:any){
    return this.http.put(`${baserUrl}/transfer/`,stockTransfer);
  }


}
