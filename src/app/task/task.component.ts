import { Component, Input , Output, EventEmitter } from '@angular/core';
import { TaskAPI } from '../api/task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Input() task:any = {};
  show:boolean;
  @Input() bulkmode:boolean;

  constructor (private taskAPI: TaskAPI, private toastr: ToastrService) {}

  delete() {
    if(confirm("Are you sure to delete?")) {
      this.taskAPI.delete(this.task.id).subscribe(() => {
        this.toastr.success('Task was Deleted!');
        this.onDelete.emit(this.task);
      });
    }
  }

  markAsDone() {
    this.taskAPI.update(this.task.id, { task: {'done': !this.task.done} }).subscribe((data) => {
      Object.assign(this.task, data);
      this.toastr.success('Task has been done!');
    });
  }
}
