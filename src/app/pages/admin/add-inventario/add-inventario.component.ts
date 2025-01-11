import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-inventario',
  templateUrl: './add-inventario.component.html',
  styleUrls: ['./add-inventario.component.css']
})
export class AddInventarioComponent implements OnInit {

    inventario = {
      nombre : '',
      ubicacion : ''
    }

    constructor(private InventarioService:InventarioService,private snack:MatSnackBar,private router:Router
      , private ModalService:ModalService
    ) { }

    ngOnInit(): void {
    }

    closeModal() {
      this.ModalService.cerrarAddInventario();
    }

    formSubmit(){
      if(this.inventario.nombre.trim() == '' || this.inventario.nombre == null){
        this.snack.open("El nombre del inventario es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.inventario.ubicacion.trim() == '' || this.inventario.ubicacion == null){
        this.snack.open("La ubicación del inventario es requerida !!",'',{
          duration:3000
        })
        return ;
      }

      this.InventarioService.agregarInventario(this.inventario).subscribe(
        (dato:any) => {
          Swal.fire('Inventario agregado','El inventario ha sido agregada con éxito','success').then(() => {
            this.closeModal();
            window.location.reload();
          });
        },
        (error) => {
          console.log(error);
          Swal.fire('Error !!','Error al guardar el inventario','error')
        }
      )
    }
}
