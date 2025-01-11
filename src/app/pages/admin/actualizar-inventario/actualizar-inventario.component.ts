import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from '../../../services/inventario.service';
import { ModalService } from 'src/app/services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-actualizar-inventario',
  templateUrl: './actualizar-inventario.component.html',
  styleUrls: ['./actualizar-inventario.component.css']
})
export class ActualizarInventarioComponent implements OnInit {

  constructor(
      private route:ActivatedRoute,
      private InventarioService:InventarioService,
      private router:Router,
      private ModalService:ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    inventarioId = 0;
    inventario:any;

    ngOnInit(): void {
      this.inventarioId = this.data.inventarioId;
      this.InventarioService.obtenerInventarios(this.inventarioId).subscribe(
        (data) => {
          this.inventario = data;
          console.log(this.inventario);
        },
        (error) => {
          console.log(error);
        }
      )
    }

    closeModal() {
      this.ModalService.cerrarActualizarInventario();
    }

    public actualizarDatos(){
      this.InventarioService.actualizarInventario(this.inventario).subscribe(
        (data) => {
          Swal.fire('Inventario actualizado','Inventario ha sido actualizado con éxito','success').then(() => {
            this.closeModal();
            window.location.reload();
          });
        },
        (error) => {
          Swal.fire('Error en el sistema','No se ha podido actualizar el inventario','error');
          console.log(error);
        }
      )
    }


}
