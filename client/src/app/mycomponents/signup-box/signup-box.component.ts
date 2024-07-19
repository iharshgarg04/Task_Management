import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-box',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './signup-box.component.html',
  styleUrl: './signup-box.component.css'
})
export class SignupBoxComponent {
  signupObj : Signup;
  constructor(private http:HttpClient,private router: Router,private toastr: ToastrService) {
    this.signupObj = new Signup(); 
  }
  navigateToLogin(){
    this.router.navigate(['/']);
  }
  onSignUp(){
    this.http.post('https://task-management-server-omega-six.vercel.app/user/signup',this.signupObj).subscribe((res:any)=>{
      if(res.success===true){
        this.toastr.success("Signup successfully");
        this.router.navigate(['/home'])
      }
    },(error)=>{
      this.toastr.error(error.error.message);
    })
  }
}

export class Signup{
  username:string;
  email:string;
  password:string;
  constructor(){
    this.username ='';
    this.email='';
    this.password='';
  }
}
