import { Component } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [TasksComponent,AddTaskComponent,HistoryComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
