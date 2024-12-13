import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { VentaService } from 'src/app/services/venta.service';
import  Swal  from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesService } from 'src/app/services/clientes.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-actualizar-venta',
  templateUrl: './actualizar-venta.component.html',
  styleUrls: ['./actualizar-venta.component.css']
})
export class ActualizarVentaComponent implements OnInit {

  constructor(private modalService:ModalService,private ventaService:VentaService,private ClientesService:ClientesService,
    private router:Router,private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public datas: any) { }

  ventaId = 0;
  venta:any;

  clienteControl = new FormControl();
  filteredClientes!: Observable<any[]>;
  clientes: any[] = [];


  ngOnInit(): void {
    this.ventaId = this.datas.ventaId;
    this.ventaService.obtenerVenta(this.ventaId).subscribe(
      (data) => {
        this.venta = data;
        console.log(this.venta);
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
    this.modalService.cerrarModalActualizar();
  }

  public actualizarDatos(){
    const clienteSeleccionado = this.clienteControl.value;

    this.venta.cliente.clienteId=clienteSeleccionado.clienteId;
    this.ventaService.actualizarVentas(this.venta).subscribe(
      (data) => {
        Swal.fire('Venta actualizada','La Venta ha sido actualizada con éxito','success').then(
          (e) => {
            this.modalService.cerrarModalActualizar();
            location.reload()
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar la venta','error');
        console.log(error);
      }
    )
  }

  // Propiedad computada para combinar nombre completo
  get fullName(): string {
    const { nombre, apellidoPaterno, apellidoMaterno } = this.venta.cliente || {};
    return `${nombre || ''} ${apellidoPaterno || ''} ${apellidoMaterno || ''}`.trim();
  }

  set fullName(value: string) {
    const parts = value.split(' ');
    this.venta.cliente.nombre = parts[0] || '';
    this.venta.cliente.apellidoPaterno = parts[1] || '';
    this.venta.cliente.apellidoMaterno = parts.slice(2).join(' ') || '';
  }

 

}
