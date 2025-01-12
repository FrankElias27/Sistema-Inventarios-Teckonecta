import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { map, Observable, startWith } from 'rxjs';
import { Estado } from 'src/app/models/estado.model';
import { InventarioService } from 'src/app/services/inventario.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';
import { TransferService } from '../../../services/transfer.service';


@Component({
  selector: 'app-add-movimiento',
  templateUrl: './add-movimiento.component.html',
  styleUrls: ['./add-movimiento.component.css']
})
export class AddMovimientoComponent implements OnInit {


    transferData = {
      fromInventory: {
        inventarioId: '', // ID del inventario origen
      },
      toInventory: {
        inventarioId: '', // ID del inventario destino
      },
      fechaTransferencia: '',
      cantidad: '',
      estado:Estado.RECIENCREADO,
    };

    fromInventoryControl = new FormControl();
    toInventoryControl  = new FormControl();
    filteredFromInventory!: Observable<any[]>;
    filteredToInventory!: Observable<any[]>;
    inventarios: any[] = [];

    constructor(
      private InventarioService: InventarioService,
      private snack: MatSnackBar,
      private modalService:ModalService,
      private TransferService:TransferService
      ) { }

      ngOnInit(): void {
        // Inicializar los controles de formulario
        this.fromInventoryControl = new FormControl('');
        this.toInventoryControl = new FormControl('');

        // Cargar los datos de inventarios
        this.InventarioService.listarInventarioDetalle().subscribe(
          (datos: any[]) => {
            this.inventarios = datos;
          },
          (error) => {
            console.log(error);
            // Manejo de errores si es necesario
          }
        );

        // Configurar el filtro para el autocompletado del inventario de origen
        this.filteredFromInventory = this.fromInventoryControl.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value?.nombre)), // Manejar el nombre del inventario
          map(nombre => (nombre ? this._filterInventarios(nombre) : this.inventarios.slice()))
        );

        // Configurar el filtro para el autocompletado del inventario de destino
        this.filteredToInventory = this.toInventoryControl.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value?.nombre)), // Manejar el nombre del inventario
          map(nombre => (nombre ? this._filterInventarios(nombre) : this.inventarios.slice()))
        );
      }

      // Filtrar los inventarios por nombre
      private _filterInventarios(nombre: string): any[] {
        const filterValue = nombre.toLowerCase();
        return this.inventarios.filter(inventario =>
          inventario.nombre.toLowerCase().includes(filterValue)
        );
      }

      // Mostrar el nombre del inventario en el campo de autocompletado
      displayFn(inventario: any): string {
        return inventario && inventario.nombre ? inventario.nombre : '';
      }

    guardarMovimiento() {
      const fromInventory = this.fromInventoryControl.value;
      const toInventory = this.toInventoryControl.value;

      if (!fromInventory || !fromInventory.inventarioId) {
        this.snack.open('El inventario de origen es requerido', '', { duration: 3000 });
        return;
      }
      if (!toInventory || !toInventory.inventarioId) {
        this.snack.open('El inventario de destino es requerido', '', { duration: 3000 });
        return;
      }
      if (!this.transferData.fechaTransferencia) {
        this.snack.open('La fecha de transferencia es requerida', '', { duration: 3000 });
        return;
      }

      // Ajustar la fecha seleccionada con la hora actual usando Moment.js
      const fechaSeleccionada = moment(this.transferData.fechaTransferencia);
      const fechaConHoraActual = fechaSeleccionada.set({
        hour: moment().hour(),
        minute: moment().minute(),
        second: 0,
      });
      this.transferData.fechaTransferencia = fechaConHoraActual.format('YYYY-MM-DDTHH:mm:ss');

      // Asignar IDs de inventarios
      this.transferData.fromInventory.inventarioId = fromInventory.inventarioId;
      this.transferData.toInventory.inventarioId = toInventory.inventarioId;

      console.log(this.transferData);

        this.TransferService.agregarTransfer(this.transferData).subscribe(
          (transferCreado) => {
            console.log(transferCreado);
            Swal.fire('Movimiento guardado', 'Continue con el Registro del Detalle Movimiento', 'success').then(
              (e) => {
                this.modalService.cerrarModal();
                location.reload()
              });

          },
          (error) => {
            Swal.fire('Error', 'Error al guardar el movimiento', 'error');
          }
        );

    }

    closeModal() {
      this.modalService.cerrarAddMovimiento();
    }

}
