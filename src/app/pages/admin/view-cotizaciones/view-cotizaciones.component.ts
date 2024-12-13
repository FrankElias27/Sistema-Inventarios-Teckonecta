import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-view-cotizaciones',
  templateUrl: './view-cotizaciones.component.html',
  styleUrls: ['./view-cotizaciones.component.css']
})
export class ViewCotizacionesComponent implements OnInit {

  constructor(private modalService:ModalService) {  }

  ngOnInit(): void {
  }

  abrirModal(): void {
    this.modalService.openNuevoCotizacionModal();
  }

}
