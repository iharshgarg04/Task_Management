import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-box',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule, InputTextModule, FloatLabelModule,ProgressSpinnerModule,CommonModule],
  templateUrl: './auth-box.component.html',
  styleUrl: './auth-box.component.css'
})
export class AuthBoxComponent {
  isLoading:boolean =false;
  loginObj : Login;
  constructor(private toastr: ToastrService,private http:HttpClient,private router : Router,) { 
    this.loginObj = new Login();
  }
  navigateToSignup(){
    this.router.navigate(['/signup']);
  }
  onLogin(){
    this.isLoading = true;
    this.http.post(`https://task-management-server-omega-six.vercel.app/user/login`,this.loginObj).subscribe((res:any)=>{
      if(res.success===true){
        this.toastr.success("Login successfully");
        this.router.navigate(['/home']);
        this.isLoading=false;
        localStorage.setItem('userData', JSON.stringify(res.user));
      }
      // console.log(res);
    },(error)=>{
      // console.log(error)
      this.isLoading =false;

      this.toastr.error("Login Failed");
    })
  }
}

export class Login{
    username:string;
    password:string;
    constructor(){
      this.username='';
      this.password=''
    }
}
