import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ReportBycategoryService {

  constructor(private http: HttpClient) { }

  descargarReporte(tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/report/stock/download?tipo=${tipo}`, {
      responseType: 'blob' // Aquí se define el tipo de respuesta esperada
    });
  }
  descargarReportes(tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/report/stock/downloads?tipo=${tipo}`, {
      responseType: 'blob' // Aquí se define el tipo de respuesta esperada
    });
  }
  descargarReportess(tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/report/stock/downloadss?tipo=${tipo}`, {
      responseType: 'blob' // Aquí se define el tipo de respuesta esperada
    });
  }
}
