import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLoggedIn = false;
  user: Usuario | null = null;
  hasAdminRole: boolean = false;

  constructor(public login:LoginService) { }

  ngOnInit(): void {

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser() as Usuario;

    if (this.isLoggedIn && this.user) {
      this.hasAdminRole = this.user?.authorities?.some((auth) => auth.authority === 'ADMIN') || false;
    }

    this.login.loginStatusSubjec.asObservable().subscribe(data => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser() as Usuario;

      if (this.isLoggedIn && this.user) {
        this.hasAdminRole = this.user?.authorities?.some((auth) => auth.authority === 'ADMIN') || false;
      }


      setTimeout(() => {
        window.location.reload();
      }, 10);
    });
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

}

