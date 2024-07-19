import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskEventService } from '../../services/task-event.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  private taskChangedSubscription: Subscription = new Subscription();
  data:any;
  constructor(private http:HttpClient,private taskEventService: TaskEventService){}

  ngOnInit(){
    const userId = localStorage.getItem('userData');
    // console.log(userId)
    if(userId){
      const parsed = JSON.parse(userId);
      // console.log(parsed)
      this.fetchHistory(parsed._id);
    }else{
      console.log(userId,"User data is not present");
    }

    this.taskChangedSubscription = this.taskEventService.taskChanged$.subscribe(() => {
      const userId = localStorage.getItem('userData');
      if (userId) {
        const parsed = JSON.parse(userId);
        this.fetchHistory(parsed._id);
      }
    });

  }

  fetchHistory(userId:string){
    this.http.get(`http://localhost:4000/history/fetchHistory/${userId}`).subscribe((res:any)=>{
      this.data = res.response;
      console.log(this.data);
    },(error)=>{
      console.log(error.message)
    })
  }
}
