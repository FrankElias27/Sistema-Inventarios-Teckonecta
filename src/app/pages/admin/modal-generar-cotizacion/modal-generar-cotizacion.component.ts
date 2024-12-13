import { Component, OnInit,Inject } from '@angular/core';
import { CotiacionesReportService } from 'src/app/services/cotiaciones-report.service';
import { ModalService } from 'src/app/services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-generar-cotizacion',
  templateUrl: './modal-generar-cotizacion.component.html',
  styleUrls: ['./modal-generar-cotizacion.component.css']
})
export class ModalGenerarCotizacionComponent implements OnInit {

  cotizacionId:any;
  constructor(private modalService:ModalService,private CotizacionSencilla:CotiacionesReportService,@Inject(MAT_DIALOG_DATA) public datas: any) { }

  ngOnInit(): void {
    this.cotizacionId = this.datas.cotizacionId;
  }

  descargarCotizacionSencilla() {
    this.CotizacionSencilla.descargarCotizacionSencilla(this.cotizacionId,'PDF').subscribe(
      (data: Blob) => {
        this.descargarArchivo(data); // Método para descargar el archivo
      },
      (error) => {
        console.error('Error al descargar el archivo PDF', error);
      }
    );
  }

  descargarCotizacionDetallada() {
    this.CotizacionSencilla.descargarCotizacionDetallada(this.cotizacionId,'PDF').subscribe(
      (data: Blob) => {
        this.descargarArchivo(data); // Método para descargar el archivo
      },
      (error) => {
        console.error('Error al descargar el archivo PDF', error);
      }
    );
  }

  closeModal() {
    this.modalService.cerrarGenerarModal();
  }

  descargarArchivo(data: Blob) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url); // Abre una nueva ventana con el archivo PDF
  }

}
