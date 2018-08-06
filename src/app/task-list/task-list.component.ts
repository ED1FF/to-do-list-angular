import { Component, Input, EventEmitter, Output, AfterViewChecked } from '@angular/core';
import { BulkTasksAPI } from '../api/bulk_tasks';

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

  constructor(public bulkApi: BulkTasksAPI) {}

  selectAll(){
    if (this.bulkmode) {
      Object.keys(this.tasks).forEach((id) => {
        this.selectedTasks[this.tasks[id]['id']] = true;
      })
    } else {
      this.selectedTasks = {};
    }
  }

  onDelete(task) {
    this.onDestroy.emit(task);
  }

  markAllAs(done) {
    let ids = this.idsOfSelectedTasks();
    this.bulkApi.update({done: !this.done, id: ids}).subscribe((data) => {
      ids.forEach((id) => {
        let task = this.tasks.find(i => i.id === id)
        task['done'] = !this.done
      });
      this.selectedTasks = {};
    });
  }

  allDelete() {
    let ids = this.idsOfSelectedTasks();
    this.bulkApi.delete({'id[]': ids}).subscribe(() => {
      this.onDestroy.emit(ids);
    });
  }

  idsOfSelectedTasks() {
    return Object.keys(this.selectedTasks).map((key) => {
      if(this.selectedTasks[key]) {return parseInt(key)};
    });
  }
}
