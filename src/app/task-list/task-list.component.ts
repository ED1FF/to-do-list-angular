import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BulkTasksAPI } from '../api/bulk_tasks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})

export class TaskListComponent {
  @Input() tasks:any = [];
  @Input() done: boolean;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onAllDestroy: EventEmitter<any> = new EventEmitter();
  bulkmode:boolean;
  selectedTasks:any = {};

  constructor(public bulkApi: BulkTasksAPI, public toastr: ToastrService) {}

  selectAll(){
    if (this.bulkmode) {
      this.tasks.forEach((task) => {
        this.selectedTasks[task.id] = true;
      });
    } else {
      this.selectedTasks = {};
    }
  }

  onDelete(task) {
    this.onDestroy.emit(task);
  }

  markAllAs(done) {
    let ids = this.idsOfSelectedTasks();
    this.bulkApi.update({done: !this.done, id: ids}).subscribe(() => this.markAllAsSuccessHandler(ids), this.markAllAsErrorHandler);
  }

  markAllAsSuccessHandler = (ids) => {
    ids.forEach((id) => {
      let task = this.tasks.find(i => i.id === id);
      task['done'] = !this.done;
    });
    this.selectedTasks = {};
    this.toastr.success('Tasks has been successfuly updated!');
  }

  markAllAsErrorHandler = (error) => {
    this.toastr.error(JSON.stringify(error.error.errors));
  }

  allDelete() {
    let ids = this.idsOfSelectedTasks();
    this.bulkApi.delete({'id[]': ids}).subscribe(() => this.allDeleteSuccessHandler(ids), this.allDeleteErrorHandler);
  }

  allDeleteSuccessHandler = (ids) => {
    this.onDestroy.emit(ids);
    this.toastr.success('Tasks has been successfuly updated!');
  }

  allDeleteErrorHandler = (error) => {
    this.toastr.error(JSON.stringify(error.error.errors));
  }

  idsOfSelectedTasks() {
    return Object.keys(this.selectedTasks).map((key) => {
      if(this.selectedTasks[key]) {return parseInt(key)};
    });
  }
}
