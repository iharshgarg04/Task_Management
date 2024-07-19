import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskEventService } from '../../services/task-event.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialoge-component',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './dialoge-component.component.html',
  styleUrl: './dialoge-component.component.css',
})
export class DialogeComponentComponent {
  isLoading:boolean = false;
  readonly dialogRef = inject(MatDialogRef<DialogeComponentComponent>);
  dialogObj: Dialog;
  taskTitle : string;
  taskId:string;
  onNoClick(): void {
    this.dialogRef.close();
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient,private taskEventService: TaskEventService,private toastr: ToastrService) {
    this.taskTitle = data.taskTitle;
    this.dialogObj = new Dialog();
    this.taskId = data.taskId;
  }
  handleSubmit() {
    const userId = localStorage.getItem('userData');
    if (!userId) {
      console.log('User id is not present');
    } else {
        if(this.taskTitle==='Add'){
          this.handleAddSubmit(userId);
        }else{
          this.handleEditSubmit(userId);
        }
    }
  }
  handleAddSubmit(userId:string){
    const parsed = JSON.parse(userId);
    this.dialogObj.userId = parsed._id;
    this.isLoading =true;
    this.http
      .post(`https://task-management-server-omega-six.vercel.app/task/addTask`, this.dialogObj)
      .subscribe(
        (res: any) => {
          this.toastr.success("Task Added successfully");
          console.log(res);
          this.isLoading = false;
          this.taskEventService.taskChanged();
          this.dialogRef.close();
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }
  handleEditSubmit(userId:string){
    const parsed = JSON.parse(userId);
    this.dialogObj.userId = parsed._id;
    console.log(this.taskId);
    this.isLoading = true;
    this.http.put(`https://task-management-server-omega-six.vercel.app/task/editTask/${this.taskId}`,this.dialogObj).subscribe((res:any)=>{
      console.log("Task updated successfully");
      this.toastr.success("Task updated successfully");
      this.taskEventService.taskChanged();
      this.dialogRef.close();
      this.isLoading = false;
    },(error)=>{
      console.log(error);
      this.isLoading = false;
      console.log("Error while Editing the task");
    })
  }
}
export class Dialog {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  userId: string;
  constructor() {
    this.title = '';
    this.description = '';
    this.dueDate = '';
    this.priority = '';
    this.userId = '';
  }
}
