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

  descargarNormalPDF() {
    this.reportService.descargarReportess('PDF').subscribe(
      (data: Blob) => {
        this.descargarArchivo(data, 'reporte-inventario.pdf'); // Puedes usar un nombre predeterminado
      },
      (error) => {
        console.error('Error al descargar el archivo PDF', error);
      }
    );

}

  descargarNormalEXCEL() {
    this.reportService.descargarReportess('EXCEL').subscribe(
      (data: Blob) => {
        this.descargarArchivoExcel(data, 'reporte-inventario.xlsx'); // Puedes usar un nombre predeterminado
      },
      (error) => {
        console.error('Error al descargar el archivo EXCEL', error);
      }
    );
  }



  descargarTotalPDF() {
    this.reportService.descargarReportes('PDF').subscribe(
      (data: Blob) => {
        this.descargarArchivo(data, 'reporte-inversion-total.pdf'); // Puedes usar un nombre predeterminado
      },
      (error) => {
        console.error('Error al descargar el archivo PDF', error);
      }
    );

}

  descargarTotalEXCEL() {
    this.reportService.descargarReportes('EXCEL').subscribe(
      (data: Blob) => {
        this.descargarArchivoExcel(data, 'reporte-inversion-total.xlsx'); // Puedes usar un nombre predeterminado
      },
      (error) => {
        console.error('Error al descargar el archivo EXCEL', error);
      }
    );
  }

  descargarArchivo(data: Blob, fileName: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace temporal y hacer clic en él para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Aquí estableces el nombre del archivo
    document.body.appendChild(link);
    link.click();

    // Limpiar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  descargarArchivoExcel(data: Blob, fileName: string) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Nombre del archivo
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}


