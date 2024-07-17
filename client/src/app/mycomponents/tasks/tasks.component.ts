import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component , inject, OnInit} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponentComponent } from '../dialoge-component/dialoge-component.component';

import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'

interface City {
  name: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule,MatIconModule,AccordionModule,DropdownModule,FormsModule,ButtonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  viewProviders: [provideIcons({ })]
})
export class TasksComponent {
  data:any;
  taskTitle = 'Edit'
  status: City[] | undefined;
  selectedStatus: City | undefined;
  constructor(private http:HttpClient){}

  ngOnInit():void{

    this.status = [
      { name: 'to-do'},
      { name: 'in-progress', },
      { name: 'completed', },
    ];

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

  readonly dialog = inject(MatDialog);
  openDialog(taskId:string): void {
    const dialogRef = this.dialog.open(DialogeComponentComponent,{
      data:{taskTitle:this.taskTitle,taskId:taskId}
    });
  }

  handleDelete(taskId:string){
    const userId = localStorage.getItem('userData');
    if(userId){
      const parsed = JSON.parse(userId);
      console.log(parsed);
      this.http.delete(`http://localhost:4000/task/deleteTask/${taskId}?userId=${parsed._id}`,).subscribe((res:any)=>{
        this.fetchData(parsed._id);
        console.log(res);
      },(error)=>{
        console.log(error);
        console.log("Task Deleted Successfully");
      })
    }else{
      console.log(userId,"User data is not present");
    }
  }

  handleStatus(taskId:string){
    const userId = localStorage.getItem('userData');
    if(userId){
      const parsed = JSON.parse(userId);
      const payload = {
        taskId:taskId,
        userId:parsed._id,
        status:this.selectedStatus,
      }
      console.log(payload)
      this.http.put("http://localhost:4000/task/updateStatus",payload).subscribe((res:any)=>{
        this.fetchData(parsed._id);
        console.log("Status changed successfully");
        console.log(res);
      },error=>{
        console.log(error);
      })
    }
  }
}
