import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import  Swal  from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-procesar-cotizacion',
  templateUrl: './modal-procesar-cotizacion.component.html',
  styleUrls: ['./modal-procesar-cotizacion.component.css']
})
export class ModalProcesarCotizacionComponent implements OnInit {
  form!: FormGroup;
  cotizacionId:any;
  cotizacion: any = {}

  constructor(private router:Router,private fb: FormBuilder,private cotizacionService:CotizacionService,private modalService:ModalService,private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public datas: any) { console.log(datas); }

  ngOnInit(): void {
    this.cotizacionId = this.datas.cotizacionId;
    this.cotizacionService.obtenerCotizacion(this.cotizacionId).subscribe(
      (data) => {
        this.cotizacion = data;
        console.log(this.cotizacion);
      },
      (error) => {
        console.log(error);
      }
    )

    this.form = this.fb.group({
      MontoTotal: ['', [Validators.required]]
    });
  }

  
  closeModal() {
    this.modalService.cerrarProcesarModal();
  }

  actualizarDatos(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cotizacion.subTotalServicios = this.form.get('MontoTotal')?.value;
      this.cotizacionService.actualizarCotizacion(this.cotizacion).subscribe(
        () => resolve(),
        (error) => {
          Swal.fire('Error en el sistema', 'No se ha podido actualizar el monto en la cotizacion', 'error');
          console.log(error);
          reject(error);
        }
      );
    });
  }

  async ProcesarCotizacion() {
    try {
      await this.actualizarDatos(); // Espera a que se complete actualizarDatos
      this.cotizacion.total = (Number(this.cotizacion.subTotalServicios) + Number(this.cotizacion.subTotalCotizacion)).toFixed(2);
      this.cotizacion.estadoCotizacion = "PROCESADO";
  
      const result = await this.cotizacionService.actualizarCotizacion(this.cotizacion).toPromise();
  
      Swal.fire('Cotizacion procesada', 'La cotizacion ha sido procesada con éxito', 'success').then(() => {
        console.log('Cotizacion procesada con éxito:', result);
        this.closeModal(); // Cierra el modal después de mostrar el mensaje
        location.reload();
      });
    } catch (error) {
      Swal.fire('Error en el sistema', 'No se ha podido actualizar la cotizacion', 'error');
      console.error('Error al actualizar cotizacion:', error);
    }
  }
}
