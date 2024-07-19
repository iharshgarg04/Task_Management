import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskEventService {
  // Subject to emit task changed events
  private taskChangedSource = new Subject<void>();

  // Observable to subscribe to task changed events
  taskChanged$ = this.taskChangedSource.asObservable();

  // Method to emit the task changed event
  taskChanged() {
    this.taskChangedSource.next();
  }
}
