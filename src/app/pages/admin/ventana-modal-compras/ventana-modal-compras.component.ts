import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClientesService } from '../../../services/clientes.service';
import { startWith, map } from 'rxjs/operators';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ComprasService } from 'src/app/services/compras.service';
import { Estado } from 'src/app/models/estado.model';
import * as moment from 'moment';


@Component({
  selector: 'app-ventana-modal-compras',
  templateUrl: './ventana-modal-compras.component.html',
  styleUrls: ['./ventana-modal-compras.component.css']
})
export class VentanaModalComprasComponent implements OnInit {
   // Datos de la venta
   CompraData = {
    proveedor: {
        proveedorId:'',
    },
    fechaCompra: '',
    numTotalProductos: '',
    totalaPagar: '',
    estado:Estado.RECIENCREADO
  };

  proveedorControl = new FormControl();
  filteredProveedores!: Observable<any[]>;
  proveedores: any[] = [];

  constructor(
    private compraService: ComprasService,
    private snack: MatSnackBar,
    private modalService:ModalService,
    private router:Router,
    private ProveedorService:ProveedorService
  ) { }

  ngOnInit(): void {
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

  guardarVenta() {

    const selectedClient = this.proveedorControl.value;

    if (!selectedClient || !selectedClient.razonSocial) {
      this.snack.open('El proveedor es requerido', '', {
        duration: 3000
      });
      return;
    }
    if (!this.CompraData.fechaCompra) {
      this.snack.open('La fecha de la compra es requerida', '', {
        duration: 3000
      });
      return;
    }

       // Ajustar la fecha seleccionada con la hora actual usando Moment.js
  const fechaSeleccionada = moment(this.CompraData.fechaCompra);
  const fechaConHoraActual = fechaSeleccionada.set({
    hour: moment().hour(),
    minute: moment().minute(),
    second: 0,
  });

  // Convertir la fecha a una cadena en formato ISO (o el que prefieras)
  this.CompraData.fechaCompra = fechaConHoraActual.format('YYYY-MM-DDTHH:mm:ss'); // Ejemplo: "2025-01-05T06:25:00"


    const ProveedorSeleccionado = this.proveedorControl.value;

    this.CompraData.proveedor.proveedorId=ProveedorSeleccionado.proveedorId;

    console.log(this.CompraData);

    this.CompraData.estado=Estado.RECIENCREADO;

    this.compraService.agregarCompras(this.CompraData).subscribe(
      (compraCreada) => {
        console.log(compraCreada);
        Swal.fire('Compra guardada', 'Continue con el Registro del Detalle de Compra', 'success').then(
          (e) => {
            this.modalService.cerrarModal();
            location.reload()
          });

      },
      (error) => {
        Swal.fire('Error', 'Error al guardar la compra', 'error');
      }
    );
  }

  closeModal() {
    this.modalService.cerrarModalCompras();
  }


}
