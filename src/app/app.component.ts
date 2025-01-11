import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sistema-examenes-frontend';

  isHomePage = false;
  isLoginPage = false;
  isNotFoundPage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {

      const currentUrl = this.router.url;
      this.isLoginPage = currentUrl === '/login';
      this.isNotFoundPage = currentUrl === '/404';
      this.isHomePage = currentUrl === '/';

    });

    initFlowbite();
  }
}
