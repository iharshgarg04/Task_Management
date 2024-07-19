import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenuModule, ButtonModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  constructor(private router :Router){}
  ngOnInit() {
      this.items = [
          {
              label: 'Options',
              items: [
                  {
                      label: 'History',
                      icon: 'pi pi-history',
                      routerLink:['/history'],
                  },
                  {
                      label: 'Home',
                      icon: 'pi pi-home',
                      routerLink:['/home'],
                  }
              ]
          }
      ];
  }
}
