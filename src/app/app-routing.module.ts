import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriasComponent } from './pages/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './pages/admin/add-categoria/add-categoria.component';
import { ViewProductosComponent } from './pages/admin/view-productos/view-productos.component';
import { AddProductoComponent } from './pages/admin/add-producto/add-producto.component';
import { ActualizarProductoComponent } from './pages/admin/actualizar-producto/actualizar-producto.component';
import { ActualizarCategoriaComponent } from './pages/admin/actualizar-categoria/actualizar-categoria.component';
import { WelcomeeComponent } from './pages/user/welcomee/welcomee.component';
import { ViewPedidosUserComponent } from './pages/user/view-pedidos-user/view-pedidos-user.component';
import { ViewProductopedidoUserComponent } from './pages/user/view-productopedido-user/view-productopedido-user.component';
import { ViewReportesComponent } from './pages/admin/view-reportes/view-reportes.component';
import { ViewSalidasComponent } from './pages/admin/view-salidas/view-salidas.component';
import { ViewVentasComponent } from './pages/admin/view-ventas/view-ventas.component';
import { AddVentasComponent } from './pages/admin/add-ventas/add-ventas.component';
import { ViewDetalleComponent } from './pages/admin/view-detalle/view-detalle.component';
import { ModalDetalleComponent } from './pages/admin/modal-detalle/modal-detalle.component';
import { ViewClienteComponent } from './pages/admin/view-cliente/view-cliente.component';
import { AddClienteComponent } from './pages/admin/add-cliente/add-cliente.component';
import { ActualizarClienteComponent } from './pages/admin/actualizar-cliente/actualizar-cliente.component';
import { ViewProveedoresComponent } from './pages/admin/view-proveedores/view-proveedores.component';
import { AddProveedoresComponent } from './pages/admin/add-proveedores/add-proveedores.component';
import { ActualizarProveedorComponent } from './pages/admin/actualizar-proveedor/actualizar-proveedor.component';
import { ViewComprasComponent } from './pages/admin/view-compras/view-compras.component';
import { ViewDetalleComprasComponent } from './pages/admin/view-detalle-compras/view-detalle-compras.component';
import { ViewCotizacionesComponent } from './pages/admin/view-cotizaciones/view-cotizaciones.component';
import { ViewCotizacionTeccuidaComponent } from './pages/admin/view-cotizacion-teccuida/view-cotizacion-teccuida.component';
import { ViewServiciosComponent } from './pages/admin/view-servicios/view-servicios.component';
import { AddServiciosComponent } from './pages/admin/add-servicios/add-servicios.component';
import { ActualizarServicioComponent } from './pages/admin/actualizar-servicio/actualizar-servicio.component';
import { ViewDetalleCotizacionComponent } from './pages/admin/view-detalle-cotizacion/view-detalle-cotizacion.component';
import { ViewDetalleServicioComponent } from './pages/admin/view-detalle-servicio/view-detalle-servicio.component';
import { SignupComponent } from './pages/admin/signup/signup.component';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
    canActivate:[AdminGuard],
    children:[
        {
          path:'profile',
          component:ProfileComponent
        },
        {
          path:'',
          component:WelcomeComponent
        },
        {
          path:'categorias',
          component:ViewCategoriasComponent
        },
        {
          path:'add-categoria',
          component:AddCategoriaComponent
        },
        {
          path:'categoria/:categoriaId',
          component:ActualizarCategoriaComponent
        },
        {
          path:'productos',
          component:ViewProductosComponent
        },
        {
          path:'add-productos',
          component:AddProductoComponent
        },
        {
          path:'productos/:productoId',
          component:ActualizarProductoComponent
        },
        {
          path:'ver-salidas',
          component : ViewSalidasComponent
        },
        {
          path:'ver-reportes',
          component : ViewReportesComponent
        },
        {
          path:'ventas',
          component : ViewVentasComponent
        },
        {
          path:'add-ventas',
          component:AddVentasComponent
        },
        {
          path:'ver-detalle/:ventaId/:cliente',
          component:ViewDetalleComponent
        },
        {
          path:'clientes',
          component:ViewClienteComponent
        },
        {
          path:'add-clientes',
          component:AddClienteComponent
        },
        {
          path:'clientes/:clienteId',
          component:ActualizarClienteComponent
        },
        {
          path:'proveedores',
          component:ViewProveedoresComponent
        },
        {
          path:'add-proveedores',
          component:AddProveedoresComponent
        },
        {
          path:'proveedores/:proveedorId',
          component:ActualizarProveedorComponent
        },
        {
          path:'compras',
          component : ViewComprasComponent
        },
        {
          path:'ver-detalleCompra/:compraId/:proveedor',
          component:ViewDetalleComprasComponent
        },
        {
          path:'ver-cotizaciones',
          component : ViewCotizacionesComponent
        },
        {
          path:'ver-cotizacion-teccuida',
          component : ViewCotizacionTeccuidaComponent
        },
        {
          path:'servicios',
          component : ViewServiciosComponent
        },
        {
          path:'add-servicios',
          component:AddServiciosComponent
        },
        {
          path:'servicios/:servicioId',
          component:ActualizarServicioComponent
        },
        {
          path:'ver-detalle-cotizacion/:cotizacionId/:cliente',
          component:ViewDetalleCotizacionComponent
        },
        {
          path:'ver-detalle-servicio/:cotizacionId/:cliente',
          component:ViewDetalleServicioComponent
        },
        {
          path:'registro',
          component:SignupComponent
        },






    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'',
        component:WelcomeeComponent
      },
      {
        path:'pedidos',
        component:ViewPedidosUserComponent
        },
        {
          path:'ver-productos/:pedidoId/:cliente',
          component:ViewProductopedidoUserComponent
          },]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
