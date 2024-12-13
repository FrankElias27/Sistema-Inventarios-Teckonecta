import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-actualizar-servicio',
  templateUrl: './actualizar-servicio.component.html',
  styleUrls: ['./actualizar-servicio.component.css']
})
export class ActualizarServicioComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private serviciosService:ServicioService,
    private router:Router) { }

  servicioId = 0;
  servicio:any;

  ngOnInit(): void {
    this.servicioId = this.route.snapshot.params['servicioId'];
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

  public actualizarDatos(){
    this.serviciosService.actualizarServicio(this.servicio).subscribe(
      (data) => {
        Swal.fire('Servicio actualizado','Servicio ha sido actualizado con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/servicios']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar el servicio','error');
        console.log(error);
      }
    )
  }

}
