import { Routes } from '@angular/router';
import { AuthBoxComponent } from './mycomponents/auth-box/auth-box.component';
import { SignupBoxComponent } from './mycomponents/signup-box/signup-box.component';
import { HomeComponentComponent } from './mycomponents/home-component/home-component.component';

export const routes: Routes = [
    {path:'',component:AuthBoxComponent},
    {path:'signup',component:SignupBoxComponent},
    {path:'home',component:HomeComponentComponent}
];
