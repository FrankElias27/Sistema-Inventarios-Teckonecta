import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import  Swal  from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {

  constructor(private ClientesService:ClientesService,private router:Router,private route:ActivatedRoute) { }

  clienteId = 0;
  cliente:any;

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.params['clienteId'];
    this.ClientesService.obtenerClientes(this.clienteId).subscribe(
      (data) => {
        this.cliente = data;
        console.log(this.cliente);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public actualizarDatos(){
    this.ClientesService.actualizarCliente(this.cliente).subscribe(
      (data) => {
        Swal.fire('Cliente actualizado','Cliente ha sido actualizado con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/clientes']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar el cliente','error');
        console.log(error);
      }
    )
  }

}
