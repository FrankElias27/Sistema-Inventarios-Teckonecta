import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { ModalService } from 'src/app/services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-actualizar-cotizacion',
  templateUrl: './actualizar-cotizacion.component.html',
  styleUrls: ['./actualizar-cotizacion.component.css']
})
export class ActualizarCotizacionComponent implements OnInit {

  constructor(private modalService:ModalService,private cotizacionService:CotizacionService,private ClientesService:ClientesService,
    private router:Router,private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public datas: any) { }

    cotizacionId = 0;
    cotizacion:any;

    clienteControl = new FormControl();
    filteredClientes!: Observable<any[]>;
    clientes: any[] = [];

  ngOnInit(): void {
    this.cotizacionId = this.datas.cotizacionId;
    this.cotizacionService.obtenerCotizacion(this.cotizacionId).subscribe(
      (data) => {
        this.cotizacion = data;
        if (this.cotizacion.fechaCotizacion) {
          // Asume que fechaCotizacion viene en formato 'DD/MM/YYYY'
          this.cotizacion.fechaCotizacion = this.convertToDate(this.cotizacion.fechaCotizacion);
        }
        console.log(this.cotizacion);
      },
      (error) => {
        console.log(error);
      }
    )

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

  closeModal() {
    this.modalService.cerrarActualizarCotizacion();
  }

  public ActualizarCotizacion(){
    const clienteSeleccionado = this.clienteControl.value;

   // Asegúrate de que la fecha esté en el formato correcto
   if (this.cotizacion.fechaCotizacion instanceof Date) {
    this.cotizacion.fechaCotizacion = this.formatDateToString(this.cotizacion.fechaCotizacion);
  }

    this.cotizacion.cliente.clienteId=clienteSeleccionado.clienteId;
    this.cotizacionService.actualizarCotizacion(this.cotizacion).subscribe(
      (data) => {
        Swal.fire('Cotizacion actualizada','La Cotizacion ha sido actualizada con éxito','success').then(
          (e) => {
            this.modalService.cerrarModalActualizar();
            location.reload()
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar la Cotizacion','error');
        console.log(error);
      }
    )
  }

  // Propiedad computada para combinar nombre completo
  get fullName(): string {
    const { nombre, apellidoPaterno, apellidoMaterno } = this.cotizacion.cliente || {};
    return `${nombre || ''} ${apellidoPaterno || ''} ${apellidoMaterno || ''}`.trim();
  }

  set fullName(value: string) {
    const parts = value.split(' ');
    this.cotizacion.cliente.nombre = parts[0] || '';
    this.cotizacion.cliente.apellidoPaterno = parts[1] || '';
    this.cotizacion.cliente.apellidoMaterno = parts.slice(2).join(' ') || '';
  }

  formatDateToString(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  convertToDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day);
  }


}
