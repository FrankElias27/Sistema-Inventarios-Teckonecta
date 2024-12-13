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

  public actualizarDatos(){
    const ProveedorSeleccionado = this.proveedorControl.value;

    this.compra.proveedor.proveedorId=ProveedorSeleccionado.proveedorId;
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
