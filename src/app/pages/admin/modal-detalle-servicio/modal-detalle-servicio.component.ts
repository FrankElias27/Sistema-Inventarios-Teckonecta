import { Component, OnInit, Inject } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { startWith, map } from 'rxjs/operators';
import { ModalService } from 'src/app/services/modal.service';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleCotizacionService } from 'src/app/services/detalle-cotizacion.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { DetalleServicioService } from 'src/app/services/detalle-servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-detalle-servicio',
  templateUrl: './modal-detalle-servicio.component.html',
  styleUrls: ['./modal-detalle-servicio.component.css']
})
export class ModalDetalleServicioComponent implements OnInit {

  servicios: any[] = [];
  servicioData: any;
  servicioControl = new FormControl();
  filteredServicios!: Observable<any[]>;
  cotizacionId:any;
  cliente:any;

  DetalleData:any = {
    subtotal:'',
    servicio:{
      servicioId:''
    },
    cotizacion:{
      cotizacionId:''
    }
  }

  constructor(private servicioService: ServicioService,private modalService:ModalService,private snack: MatSnackBar,
    private detalleServicioService:DetalleServicioService,private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public datas: any) { console.log(datas);}

  ngOnInit(): void {
    this.cotizacionId = this.datas.cotizacionId;
    this.cliente = this.route.snapshot.params['cliente'];
    this.DetalleData.cotizacion['cotizacionId'] = this.cotizacionId;
    // Método que se ejecuta al iniciar el componente
    // Obtener la lista completa de productos al iniciar el componente

    this.servicioService.listarServicioDetalle().subscribe(
      (datos: any[]) => {
        this.servicios = datos;
      },
      (error) => {
        console.log(error);
        // Manejo de errores si es necesario
      }
    );

    // Configurar el filtro para el autocompletado
    this.filteredServicios = this.servicioControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.nombreServicio),
      map(nombreServicio => nombreServicio ? this._filterServicios(nombreServicio) : this.servicios.slice())
    );
  }

  private _filterServicios(nombreServicio: string): any[] {
    const filterValue = nombreServicio.toLowerCase();
    return this.servicios.filter(servicio => servicio.nombreServicio.toLowerCase().includes(filterValue));
  }

  displayFn(servicio: any): string {
    return servicio && servicio.nombreServicio ? servicio.nombreServicio : '';
  }

  closeModal() {
    this.modalService.cerrarServicioModal();
  }

  GuardarDetalle() {

    const servicioSeleccionado = this.servicioControl.value;

    // Verificar que productoSeleccionado tenga los datos necesarios
    if (!servicioSeleccionado || !servicioSeleccionado.servicioId) {
      this.snack.open('Servicio seleccionado incompleto o inválido', '',{
        duration: 3000
      });
      return;
    }
    // Asignar valores al objeto DetalleData
    this.DetalleData.servicio.servicioId = servicioSeleccionado.servicioId;


    // Llamar al servicio para guardar el detalle de venta
    this.detalleServicioService.guardarDetalleServicio(this.DetalleData).subscribe(
      (data) => {
        Swal.fire('Servicio guardado', 'El servicio ha sido agregado con éxito', 'success').then(
          (e) => {
            this.modalService.cerrarServicioModal();
            location.reload()
          });
        // Puedes hacer otras acciones después de guardar exitosamente
      },
      (error) => {
        Swal.fire('Error', 'Error al guardar el servicio en la base de datos', 'error');
        console.error('Error al guardar el detalle de venta:', error);
      }
    );
  }

}
