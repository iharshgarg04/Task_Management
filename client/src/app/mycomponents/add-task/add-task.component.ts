import { Component, inject, model } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogeComponentComponent } from '../dialoge-component/dialoge-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  readonly dialog = inject(MatDialog);
  taskTitle = 'Add';
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogeComponentComponent,{
      data:{taskTitle:this.taskTitle}
    });
  }
}
