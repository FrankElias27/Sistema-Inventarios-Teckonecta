import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-actualizar-servicio',
  templateUrl: './actualizar-servicio.component.html',
  styleUrls: ['./actualizar-servicio.component.css']
})
export class ActualizarServicioComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private serviciosService:ServicioService,
    private router:Router,
    private ModalService:ModalService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  servicioId = 0;
  servicio:any;

  ngOnInit(): void {
    this.servicioId = this.data.servicioId;
    this.serviciosService.obtenerServicios(this.servicioId).subscribe(
      (data) => {
        this.servicio = data;
        console.log(this.servicio);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  closeModal() {
    this.ModalService.cerrarActualizarServicio();
  }

  public actualizarDatos(){
    this.serviciosService.actualizarServicio(this.servicio).subscribe(
      (data) => {
        Swal.fire('Servicio actualizado','Servicio ha sido actualizado con éxito','success').then(() => {
          this.closeModal();
          window.location.reload();
        });
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar el servicio','error');
        console.log(error);
      }
    )
  }

}
