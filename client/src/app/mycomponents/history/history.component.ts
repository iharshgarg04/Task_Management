import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  data:any;
  constructor(private http:HttpClient){}

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
