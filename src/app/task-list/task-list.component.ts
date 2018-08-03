import { Component, Input, EventEmitter, Output, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})

export class TaskListComponent {
  @Input() tasks:any = [];
  @Input() done: boolean;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter();
  bulkmode:boolean;
  tasksSelectedStatus:any = {};

  onDelete(task) {
    this.onDestroy.emit(task);
  }

  allChangeStatus(done) {

  }

  allDelete() {
    console.log(this.sortCheckedTasks())
  }

  sortCheckedTasks() {
    return Object.keys(this.tasksSelectedStatus).map((key) => {
      if(this.tasksSelectedStatus[key]) {return key}
    });
  }
}
