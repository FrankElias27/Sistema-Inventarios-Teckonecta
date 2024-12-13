import { Component, OnInit } from '@angular/core';
import { ReportBycategoryService } from 'src/app/services/report-bycategory.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-reportes',
  templateUrl: './view-reportes.component.html',
  styleUrls: ['./view-reportes.component.css']
})
export class ViewReportesComponent implements OnInit {

  constructor(private reportService: ReportBycategoryService,private http: HttpClient) { }

  ngOnInit(): void {
  }

  descargarPDF() {
    this.reportService.descargarReporte('PDF').subscribe(
      (data: Blob) => {
        this.descargarArchivo(data); // Método para descargar el archivo
      },
      (error) => {
        console.error('Error al descargar el archivo PDF', error);
      }
    );
  }
  descargarTotalPDF() {
    this.reportService.descargarReportes('PDF').subscribe(
      (data: Blob) => {
        this.descargarArchivo(data); // Método para descargar el archivo
      },
      (error) => {
        console.error('Error al descargar el archivo PDF', error);
      }
    );
  }
  descargarNormalPDF() {
    this.reportService.descargarReportess('PDF').subscribe(
      (data: Blob) => {
        this.descargarArchivo(data); // Método para descargar el archivo
      },
      (error) => {
        console.error('Error al descargar el archivo PDF', error);
      }
    );
  }

  descargarArchivo(data: Blob) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url); // Abre una nueva ventana con el archivo PDF
  }
}


