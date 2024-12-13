import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from './../../../services/categoria.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-add-servicios',
  templateUrl: './add-servicios.component.html',
  styleUrls: ['./add-servicios.component.css']
})
export class AddServiciosComponent implements OnInit {

 
  servicio = {
    nombreServicio : '',
    precioServicio : ''
  }

  constructor(private servicioService:ServicioService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.servicio.nombreServicio.trim() == '' || this.servicio.nombreServicio == null){
      this.snack.open("El título es requerido !!",'',{
        duration:3000
      })
      return ;
    }

    this.servicioService.agregarServicio(this.servicio).subscribe(
      (dato:any) => {
        this.servicio.nombreServicio = '';
        this.servicio.precioServicio= '';
        Swal.fire('Servicio agregado','El servicio ha sido agregada con éxito','success');
        this.router.navigate(['/admin/servicios']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al guardar el servicio','error')
      }
    )
  }
}
