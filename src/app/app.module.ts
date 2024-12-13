import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriasComponent } from './pages/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './pages/admin/add-categoria/add-categoria.component';
import { ViewProductosComponent } from './pages/admin/view-productos/view-productos.component';
import { AddProductoComponent } from './pages/admin/add-producto/add-producto.component';
import {MatSelectModule} from '@angular/material/select';
import { ActualizarProductoComponent } from './pages/admin/actualizar-producto/actualizar-producto.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActualizarCategoriaComponent } from './pages/admin/actualizar-categoria/actualizar-categoria.component';
import { SideBarComponent } from './pages/user/side-bar/side-bar.component';
import { WelcomeeComponent } from './pages/user/welcomee/welcomee.component';
import { ViewPedidosUserComponent } from './pages/user/view-pedidos-user/view-pedidos-user.component';
import { ViewProductopedidoUserComponent } from './pages/user/view-productopedido-user/view-productopedido-user.component';
import { ViewReportesComponent } from './pages/admin/view-reportes/view-reportes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewSalidasComponent } from './pages/admin/view-salidas/view-salidas.component';
import { ViewVentasComponent } from './pages/admin/view-ventas/view-ventas.component';
import { AddVentasComponent } from './pages/admin/add-ventas/add-ventas.component';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { VentanaModalComponent } from './pages/admin/ventana-modal/ventana-modal.component';
import { ViewDetalleComponent } from './pages/admin/view-detalle/view-detalle.component';
import { ModalDetalleComponent } from './pages/admin/modal-detalle/modal-detalle.component';
import { ActualizarVentaComponent } from './pages/admin/actualizar-venta/actualizar-venta.component';
import { ViewClienteComponent } from './pages/admin/view-cliente/view-cliente.component';
import { AddClienteComponent } from './pages/admin/add-cliente/add-cliente.component';
import { ActualizarClienteComponent } from './pages/admin/actualizar-cliente/actualizar-cliente.component';
import { ViewProveedoresComponent } from './pages/admin/view-proveedores/view-proveedores.component';
import { AddProveedoresComponent } from './pages/admin/add-proveedores/add-proveedores.component';
import { ActualizarProveedorComponent } from './pages/admin/actualizar-proveedor/actualizar-proveedor.component';
import { ViewComprasComponent } from './pages/admin/view-compras/view-compras.component';
import { VentanaModalComprasComponent } from './pages/admin/ventana-modal-compras/ventana-modal-compras.component';
import { ActualizarCompraComponent } from './pages/admin/actualizar-compra/actualizar-compra.component';
import { ViewDetalleComprasComponent } from './pages/admin/view-detalle-compras/view-detalle-compras.component';
import { ModalDetalleComprasComponent } from './pages/admin/modal-detalle-compras/modal-detalle-compras.component';
import { ViewCotizacionesComponent } from './pages/admin/view-cotizaciones/view-cotizaciones.component';
import { ModalCotizacionTeccuidaComponent } from './pages/admin/modal-cotizacion-teccuida/modal-cotizacion-teccuida.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ViewCotizacionTeccuidaComponent } from './pages/admin/view-cotizacion-teccuida/view-cotizacion-teccuida.component';
import { ViewServiciosComponent } from './pages/admin/view-servicios/view-servicios.component';
import { AddServiciosComponent } from './pages/admin/add-servicios/add-servicios.component';
import { ActualizarServicioComponent } from './pages/admin/actualizar-servicio/actualizar-servicio.component';
import { ModalCotizacionComponent } from './pages/admin/modal-cotizacion/modal-cotizacion.component';
import { ViewDetalleCotizacionComponent } from './pages/admin/view-detalle-cotizacion/view-detalle-cotizacion.component';
import { ModalDetalleCotizacionComponent } from './pages/admin/modal-detalle-cotizacion/modal-detalle-cotizacion.component';
import { ViewDetalleServicioComponent } from './pages/admin/view-detalle-servicio/view-detalle-servicio.component';
import { ModalDetalleServicioComponent } from './pages/admin/modal-detalle-servicio/modal-detalle-servicio.component';
import { ModalProcesarCotizacionComponent } from './pages/admin/modal-procesar-cotizacion/modal-procesar-cotizacion.component';
import { ModalGenerarCotizacionComponent } from './pages/admin/modal-generar-cotizacion/modal-generar-cotizacion.component';
import { ActualizarCotizacionComponent } from './pages/admin/actualizar-cotizacion/actualizar-cotizacion.component';
import { SignupComponent } from './pages/admin/signup/signup.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOptionModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriasComponent,
    AddCategoriaComponent,
    ViewProductosComponent,
    AddProductoComponent,
    ActualizarProductoComponent,
    ActualizarCategoriaComponent,
    SideBarComponent,
    WelcomeeComponent,
    ViewPedidosUserComponent,
    ViewProductopedidoUserComponent,
    ViewReportesComponent,
    ViewSalidasComponent,
    ViewVentasComponent,
    AddVentasComponent,
    VentanaModalComponent,
    ViewDetalleComponent,
    ModalDetalleComponent,
    ActualizarVentaComponent,
    ViewClienteComponent,
    AddClienteComponent,
    ActualizarClienteComponent,
    ViewProveedoresComponent,
    AddProveedoresComponent,
    ActualizarProveedorComponent,
    ViewComprasComponent,
    VentanaModalComprasComponent,
    ActualizarCompraComponent,
    ViewDetalleComprasComponent,
    ModalDetalleComprasComponent,
    ViewCotizacionesComponent,
    ModalCotizacionTeccuidaComponent,
    ViewCotizacionTeccuidaComponent,
    ViewServiciosComponent,
    AddServiciosComponent,
    ActualizarServicioComponent,
    ModalCotizacionComponent,
    ViewDetalleCotizacionComponent,
    ModalDetalleCotizacionComponent,
    ViewDetalleServicioComponent,
    ModalDetalleServicioComponent,
    ModalProcesarCotizacionComponent,
    ModalGenerarCotizacionComponent,
    ActualizarCotizacionComponent,
    SignupComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatAutocompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [authInterceptorProviders,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
