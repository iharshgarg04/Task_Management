import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './mycomponents/navbar/navbar.component';
import { AuthBoxComponent } from './mycomponents/auth-box/auth-box.component';
import { SignupBoxComponent } from './mycomponents/signup-box/signup-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatButtonModule,NavbarComponent,AuthBoxComponent,SignupBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
