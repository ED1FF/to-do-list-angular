import { Component, Input , Output, EventEmitter } from '@angular/core';
import { TaskAPI } from '../api/task'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {

  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Input() task:any = {};

  constructor (private taskAPI: TaskAPI, private toastr: ToastrService) {}

  delete() {
    if(confirm("Are you sure to delete?")) {
      this.taskAPI.delete(this.task.id).subscribe(() => {
        this.toastr.success('Task was Deleted!');
        this.onDelete.emit(this.task);
      });
    }
  }

  showEdit() {
    console.log(this)
  }

  markAsDone() {
    this.taskAPI.update(this.task.id, { task: [] }).subscribe(() => {
      this.toastr.error('Task was Deleted!');
    });
  }
}
