import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class CotiacionesReportService {

  constructor(private http: HttpClient) { }

  descargarCotizacionSencilla(cotizacion:string,tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/report/cotizacion/download?cotizacion=${cotizacion}&tipo=${tipo}`, {
      responseType: 'blob' // Aquí se define el tipo de respuesta esperada
    });
  }

  descargarCotizacionDetallada(cotizacion:string,tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/report/cotizacion2/download?cotizacion=${cotizacion}&tipo=${tipo}`, {
      responseType: 'blob' // Aquí se define el tipo de respuesta esperada
    });
  }

}
