import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskEventService } from '../../services/task-event.service';

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
  ],
  templateUrl: './dialoge-component.component.html',
  styleUrl: './dialoge-component.component.css',
})
export class DialogeComponentComponent {
  
  readonly dialogRef = inject(MatDialogRef<DialogeComponentComponent>);
  dialogObj: Dialog;
  taskTitle : string;
  taskId:string;
  onNoClick(): void {
    this.dialogRef.close();
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient,private taskEventService: TaskEventService) {
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
    this.http
      .post(`http://localhost:4000/task/addTask`, this.dialogObj)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.taskEventService.taskChanged();
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  handleEditSubmit(userId:string){
    const parsed = JSON.parse(userId);
    this.dialogObj.userId = parsed._id;
    console.log(this.taskId);
    this.http.put(`http://localhost:4000/task/editTask/${this.taskId}`,this.dialogObj).subscribe((res:any)=>{
      console.log("Task updated successfully");
      this.taskEventService.taskChanged();
      this.dialogRef.close();
    },(error)=>{
      console.log(error);
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
