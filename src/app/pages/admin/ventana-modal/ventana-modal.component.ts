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

@Component({
  selector: 'app-ventana-modal',
  templateUrl: './ventana-modal.component.html',
  styleUrls: ['./ventana-modal.component.css']
})
export class VentanaModalComponent implements OnInit {
  // Datos de la venta
  ventaData = {
    cliente: {
        clienteId:'',
    },
    fechaVenta: '',
    numTotaldeDetalleVenta: '',
    totalaPagar: '',
    estado:'',
    activo: true,
  };

  clienteControl = new FormControl();
  filteredClientes!: Observable<any[]>;
  clientes: any[] = [];

  constructor(
    private ventaService: VentaService,
    private snack: MatSnackBar,
    private modalService:ModalService,
    private router:Router,
    private ClientesService:ClientesService
    ) { }

  ngOnInit(): void {
    this.ClientesService.listarClienteDetalle().subscribe(
      (datos: any[]) => {
        this.clientes = datos;
      },
      (error) => {
        console.log(error);
        // Manejo de errores si es necesario
      }
    );

    // Configurar el filtro para el autocompletado
    this.filteredClientes = this.clienteControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.nombre), // Nombre del producto
      map(nombre => nombre ? this._filterClientes(nombre) : this.clientes.slice())
    );
  }

  private _filterClientes(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();
    return this.clientes.filter(cliente => cliente.nombre.toLowerCase().includes(filterValue));
  }

  displayFn(cliente: any): string {
    if (cliente && cliente.nombre) {
      let fullName = cliente.nombre;
      if (cliente.apellidoPaterno) {
        fullName += ' ' + cliente.apellidoPaterno;
      }
      if (cliente.apellidoMaterno) {
        fullName += ' ' + cliente.apellidoMaterno;
      }
      return fullName;
    } else {
      return '';
    }
  }

  guardarVenta() {

    const selectedClient = this.clienteControl.value;

    if (!selectedClient || !selectedClient.nombre) {
      this.snack.open('El cliente es requerido', '', {
        duration: 3000
      });
      return;
    }
    if (!this.ventaData.fechaVenta) {
      this.snack.open('La fecha de la venta es requerida', '', {
        duration: 3000
      });
      return;
    }

    const clienteSeleccionado = this.clienteControl.value;

    this.ventaData.cliente.clienteId=clienteSeleccionado.clienteId;
    this.ventaData.estado="RECIEN CREADO"

    console.log(this.ventaData);



    this.ventaService.agregarVentas(this.ventaData).subscribe(
      (ventaCreada) => {
        console.log(ventaCreada);
        Swal.fire('Venta guardada', 'Continue con el Registro del Detalle de Venta', 'success').then(
          (e) => {
            this.modalService.cerrarModal();
            location.reload()
          });

      },
      (error) => {
        Swal.fire('Error', 'Error al guardar el pedido', 'error');
      }
    );
  }

  closeModal() {
    this.modalService.cerrarModal();
  }


}
