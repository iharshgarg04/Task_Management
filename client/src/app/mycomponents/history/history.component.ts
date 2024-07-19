import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskEventService } from '../../services/task-event.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule,ProgressSpinnerModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  private taskChangedSubscription: Subscription = new Subscription();
  data:any;
  isLoading:boolean =false;
  constructor(private http:HttpClient,private taskEventService: TaskEventService,private toastr: ToastrService){}

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
    this.isLoading = true;
    this.http.get(`https://task-management-server-4pwx36ty8-solo4.vercel.app/fetchHistory/${userId}`).subscribe((res:any)=>{
      this.data = res.response;
      this.isLoading = false;
      // this.toastr.success("History Fetched successfully");
      console.log(this.data);
    },(error)=>{
      this.isLoading = false;
      console.log(error.message)
    })
  }
}
