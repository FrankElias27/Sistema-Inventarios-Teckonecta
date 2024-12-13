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
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-cotizacion',
  templateUrl: './modal-cotizacion.component.html',
  styleUrls: ['./modal-cotizacion.component.css']
})
export class ModalCotizacionComponent implements OnInit {

  // Datos de la venta
  cotizacionData = {
    cliente: {
        clienteId:'',
    },
    fechaCotizacion: '',
    asuntoCotizacion:'',
    numTotaldeDetalle: '',
    estadoCotizacion:'',
    total: '',
    activo: true,
  };

  clienteControl = new FormControl();
  filteredClientes!: Observable<any[]>;
  clientes: any[] = [];

  constructor(
    private cotizacionService: CotizacionService,
    private snack: MatSnackBar,
    private modalService:ModalService,
    private router:Router,
    private ClientesService:ClientesService,
    private datePipe: DatePipe
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

  guardarCotizacion() {

    const clienteSeleccionado = this.clienteControl.value;

    // Verifica si hay una fecha en cotizacionData y si es válida
  if (this.cotizacionData.fechaCotizacion) {
    // Transforma la fecha usando DatePipe
    const formattedDate = this.datePipe.transform(this.cotizacionData.fechaCotizacion, 'dd/MM/yyyy');

    // Maneja el caso en que formattedDate podría ser null
    if (formattedDate !== null) {
      this.cotizacionData.fechaCotizacion = formattedDate;
    } else {
      // Si el formato es null, puedes manejar el error o asignar un valor predeterminado
      this.cotizacionData.fechaCotizacion = 'Fecha inválida'; // o cualquier valor predeterminado que prefieras
    }
  }

    this.cotizacionData.cliente.clienteId=clienteSeleccionado.clienteId;
    this.cotizacionData.estadoCotizacion="RECIEN CREADO";

    console.log(this.cotizacionData);
    if (!this.cotizacionData.cliente || Object.keys(this.cotizacionData.cliente).length === 0) {
      this.snack.open('El cliente es requerido', '', {
        duration: 3000
      });
      return;
    }


    this.cotizacionService.agregarCotizaciones(this.cotizacionData).subscribe(
      (CotizacionCreada) => {
        console.log(CotizacionCreada);
        Swal.fire('Cotizacion guardada', 'Continue con el Registro del Detalle de Cotizacion', 'success').then(
          (e) => {
            this.modalService.cerrarModalCoti();
            location.reload()
          });

      },
      (error) => {
        Swal.fire('Error', 'Error al guardar la cotizacion', 'error');
      }
    );
  }

  closeModal() {
    this.modalService.cerrarModalCoti();
  }


}
