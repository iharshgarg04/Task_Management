import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-auth-box',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './auth-box.component.html',
  styleUrl: './auth-box.component.css'
})
export class AuthBoxComponent {

}
