import { Routes } from '@angular/router';
import { AuthBoxComponent } from './mycomponents/auth-box/auth-box.component';
import { SignupBoxComponent } from './mycomponents/signup-box/signup-box.component';
import { HomeComponentComponent } from './mycomponents/home-component/home-component.component';
import { HistoryComponent } from './mycomponents/history/history.component';

export const routes: Routes = [
    {path:'',component:AuthBoxComponent},
    {path:'signup',component:SignupBoxComponent},
    {path:'home',component:HomeComponentComponent},
    {path:'history',component:HistoryComponent},
];
