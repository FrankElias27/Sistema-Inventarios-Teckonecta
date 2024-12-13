import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-view-servicios',
  templateUrl: './view-servicios.component.html',
  styleUrls: ['./view-servicios.component.css']
})
export class ViewServiciosComponent implements OnInit {


  servicios:any = [
  ]

  constructor(private serviciosService:ServicioService) { }

  ngOnInit(): void {
    this.serviciosService.listarServicios().subscribe(
      (dato:any) => {
        this.servicios = dato;
        console.log(this.servicios);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar los servicios','error');
      }
    )
  }

  eliminarServicio(servicioId: any) {
    Swal.fire({
      title: 'Eliminar servicio',
      text: '¿Estás seguro de eliminar el servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviciosService.eliminarServicio(servicioId).subscribe(
          (data) => {
            this.servicios = this.servicios.filter((servicio: any) => servicio.servicioId != servicioId);
            Swal.fire('Servicio eliminado', 'El servicio ha sido eliminado de la base de datos', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el servicio', 'error');
          }
        );
      }

    });
  }
}
