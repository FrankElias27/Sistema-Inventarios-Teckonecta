import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import  Swal  from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-actualizar-proveedor',
  templateUrl: './actualizar-proveedor.component.html',
  styleUrls: ['./actualizar-proveedor.component.css']
})
export class ActualizarProveedorComponent implements OnInit {

  constructor(private ProveedorService:ProveedorService,private router:Router,private route:ActivatedRoute) { }

  proveedorId = 0;
  proveedor:any;

  ngOnInit(): void {
    this.proveedorId = this.route.snapshot.params['proveedorId'];
    this.ProveedorService.obtenerProveedor(this.proveedorId).subscribe(
      (data) => {
        this.proveedor = data;
        console.log(this.proveedor);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public actualizarDatos(){
    this.ProveedorService.actualizarProveedor(this.proveedor).subscribe(
      (data) => {
        Swal.fire('Proveedor actualizado','Proveedor ha sido actualizado con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/proveedores']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar el proveedor','error');
        console.log(error);
      }
    )
  }

}
