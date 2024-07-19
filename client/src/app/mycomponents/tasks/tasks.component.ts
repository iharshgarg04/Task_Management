import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component , inject, OnInit} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponentComponent } from '../dialoge-component/dialoge-component.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'
import { AddTaskComponent } from '../add-task/add-task.component';
import { Subscription } from 'rxjs';
import { TaskEventService } from '../../services/task-event.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface City {
  name: string;
}

interface FilterOption {
  name: string;
  code: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule,MatIconModule,AccordionModule,DropdownModule,FormsModule,ButtonModule,AddTaskComponent,TreeSelectModule,ProgressSpinnerModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  viewProviders: [provideIcons({ }),],
})
export class TasksComponent {
  data:any;
  filterData:any;
  taskTitle = 'Edit'
  status: City[] | undefined;
  selectedStatus: City | undefined;
  isLoading:boolean =false;
  private taskChangedSubscription: Subscription = new Subscription();

  statuses: FilterOption[] = [
    { name: 'To-Do', code: 'to-do' },
    { name: 'In-Progress', code: 'in-progress' },
    { name: 'Completed', code: 'completed' },
  ];

  priorities: FilterOption[] = [
    { name: 'Low', code: 'low' },
    { name: 'Medium', code: 'medium' },
    { name: 'High', code: 'high' },
  ];

  tasks: FilterOption[] = [
    { name: 'Task 1', code: 'task1' },
    { name: 'Task 2', code: 'task2' },
    { name: 'Task 3', code: 'task3' },
  ];

  selectedStatusFi: FilterOption | null = null;
  selectedPriority: FilterOption | null = null;
  selectedTask: FilterOption | null = null;

  show = false;
  
  constructor(private http:HttpClient,private taskEventService: TaskEventService,private toastr: ToastrService){}

  toggle(){
    this.show = !this.show;
  }

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

    this.taskChangedSubscription = this.taskEventService.taskChanged$.subscribe(() => {
      const userId = localStorage.getItem('userData');
      if (userId) {
        const parsed = JSON.parse(userId);
        this.fetchData(parsed._id);
      }
    });

  }
  fetchData(userId:string):void{
    this.isLoading =true;
    this.http.get(`http://localhost:4000/task/fetchMyTask/${userId}`).subscribe((res:any)=>{
      this.data= res.response;
      this.toastr.success("Tasks Fetched Successfully")
      this.filterData = res.response;
      this.isLoading =false;
    },(error)=>{
      this.isLoading=false;
      console.log(error.error.message);
    })
  }


  applyFilter(): void {
    this.filterData = this.data.filter((task: any) => {
      return (
        (!this.selectedStatusFi || task.status === this.selectedStatusFi.code) &&
        (!this.selectedPriority || task.priority === this.selectedPriority.code) &&
        (!this.selectedTask || task.name === this.selectedTask.code)
      );
    });
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
      this.isLoading = true;
      this.http.delete(`http://localhost:4000/task/deleteTask/${taskId}?userId=${parsed._id}`,).subscribe((res:any)=>{
        this.fetchData(parsed._id);
        console.log(res);
        this.isLoading =false;
        this.toastr.success("Task Deleted Successfully")
      },(error)=>{
        this.isLoading =false;
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
      this.isLoading =true;
      console.log(payload)
      this.http.put("http://localhost:4000/task/updateStatus",payload).subscribe((res:any)=>{
        this.fetchData(parsed._id);
        console.log("Status changed successfully");
        this.isLoading =false;
        this.toastr.success("Status updated Successfully")
        console.log(res);
      },error=>{
        this.isLoading=false;
        console.log(error);
      })
    }
  }
}
