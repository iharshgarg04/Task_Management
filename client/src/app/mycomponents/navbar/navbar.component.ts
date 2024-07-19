import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenuModule, ButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  private userIdSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('userData'));
  userId$ = this.userIdSubject.asObservable();
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('userData');
    this.userIdSubject.next(true);
    this.router.navigate(['/']);
  }

  ngOnInit() {
    const users = localStorage.getItem('userData'); 

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'History',
            icon: 'pi pi-history',
            routerLink: ['/history'],
          },
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: ['/home'],
          },
        ],
      },
    ];
  }
}
