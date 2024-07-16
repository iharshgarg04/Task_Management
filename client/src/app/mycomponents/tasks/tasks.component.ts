import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  viewProviders: [provideIcons({ })]
})
export class TasksComponent {
  data:any;
  constructor(private http:HttpClient){}

  ngOnInit():void{
    const userId = localStorage.getItem('userData');
    if(userId){
      const parsed = JSON.parse(userId);
      this.fetchData(parsed._id);
    }else{
      console.log(userId,"User data is not present");
    }
  }
  fetchData(userId:string):void{
    this.http.get(`http://localhost:4000/task/fetchMyTask/${userId}`).subscribe((res:any)=>{
      this.data = res.response;
      // console.log(this.data,"Hii")
    },(error)=>{
      console.log(error.error.message);
    })
  }
}
