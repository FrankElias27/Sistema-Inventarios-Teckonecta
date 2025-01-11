import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { VentaService } from 'src/app/services/venta.service';
import  Swal  from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComprasService } from 'src/app/services/compras.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { startWith, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-actualizar-compra',
  templateUrl: './actualizar-compra.component.html',
  styleUrls: ['./actualizar-compra.component.css']
})
export class ActualizarCompraComponent implements OnInit {

  constructor(private modalService:ModalService,private compraService:ComprasService, private ProveedorService:ProveedorService,
    private router:Router,private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public datas: any) { }

  compraId = 0;
  compra:any;
  proveedorControl = new FormControl();
  filteredProveedores!: Observable<any[]>;
  proveedores: any[] = [];

  ngOnInit(): void {
    this.compraId = this.datas.compraId;
    this.compraService.obtenerCompra(this.compraId).subscribe(
      (data) => {
        this.compra = data;
        // Asegurarse de que la fecha se mantenga en el formato correcto
                if (this.compra.fechaCompra) {
                  // Usar parseZone para asegurarse de que la fecha no se vea afectada por la zona horaria
                  const fechaFormateada = moment.parseZone(this.compra.fechaCompra).format('MM/DD/YYYY');

                  // Convertir la fecha a un objeto Date
                  const dateObj = moment(fechaFormateada, 'MM/DD/YYYY').toDate();

                  // Asignar el objeto Date al modelo
                  this.compra.fechaCompra = dateObj;
                }

        console.log(this.compra);
      },
      (error) => {
        console.log(error);
      }
    )

    this.ProveedorService.listarProveedorDetalle().subscribe(
      (datos: any[]) => {
        this.proveedores = datos;
      },
      (error) => {
        console.log(error);
        // Manejo de errores si es necesario
      }
    );

    // Configurar el filtro para el autocompletado
    this.filteredProveedores = this.proveedorControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.razonSocial), // Nombre del producto
      map(razonSocial => razonSocial ? this._filterProveedores(razonSocial) : this.proveedores.slice())
    );
  }

  private _filterProveedores(razonSocial: string): any[] {
    const filterValue = razonSocial.toLowerCase();
    return this.proveedores.filter(proveedor => proveedor.razonSocial.toLowerCase().includes(filterValue));
  }

  displayFn(proveedor: any): string {
    if (proveedor && proveedor.razonSocial) {
      let fullName = proveedor.razonSocial;
      return fullName;
    } else {
      return '';
    }
  }

  closeModal() {
    this.modalService.cerrarModalActualizar2();
  }

  actualizarDatos(){

    const ProveedorSeleccionado = this.proveedorControl.value;

    if (!ProveedorSeleccionado || !ProveedorSeleccionado.proveedorId) {
      Swal.fire('Proveedor no seleccionado', 'Por favor seleccione un proveedor.', 'error');
      return;
    }

    // Ajustar la fecha seleccionada con la hora actual usando Moment.js
    const fechaSeleccionada = moment(this.compra.fechaCompra); // Asegurarse de que fechaCompra tenga un valor válido
    const fechaConHoraActual = fechaSeleccionada.set({
      hour: moment().hour(),
      minute: moment().minute(),
      second: 0,
    });

    // Convertir la fecha a una cadena en formato ISO
    this.compra.fechaCompra = fechaConHoraActual.format('YYYY-MM-DDTHH:mm:ss');

    // Asignar el ID del proveedor seleccionado
    this.compra.proveedor.proveedorId = ProveedorSeleccionado.proveedorId;

    this.compraService.actualizarCompras(this.compra).subscribe(
      (data) => {
        Swal.fire('Compra actualizada','La Compra ha sido actualizada con éxito','success').then(
          (e) => {
            this.modalService.cerrarModalActualizar2();
            location.reload()
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar la compra','error');
        console.log(error);
      }
    )
  }
}
