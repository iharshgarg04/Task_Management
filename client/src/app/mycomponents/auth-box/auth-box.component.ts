import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-auth-box',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './auth-box.component.html',
  styleUrl: './auth-box.component.css'
})
export class AuthBoxComponent {
  loginObj : Login;
  constructor(private toastr: ToastrService,private http:HttpClient,private router : Router) { 
    this.loginObj = new Login();
  }
  navigateToSignup(){
    this.router.navigate(['/signup']);
  }
  onLogin(){
    this.http.post('http://localhost:4000/user/login',this.loginObj).subscribe((res:any)=>{
      if(res.success===true){
        this.toastr.success("Login successfully");
        this.router.navigate(['/home']);
        localStorage.setItem('userData', JSON.stringify(res.user));
      }
      // console.log(res);
    },(error)=>{
      // console.log(error)
      this.toastr.error(error.error.message);
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
