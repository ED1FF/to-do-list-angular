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

  setObjOfSelectedTask(){
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

  allChangeStatus(done) {
    this.bulkApi.update({'done': !this.done, 'id': this.idsOfSelectedTasks()}).subscribe((data) => {
      this.idsOfSelectedTasks().forEach((id) => {
        this.tasks.find(i => i.id === id)['done'] = !this.done
      });
      this.selectedTasks = {};
    });
  }

  allDelete() {
    this.bulkApi.delete({ 'id[]':  this.idsOfSelectedTasks()}).subscribe(() => {
      this.onAllDestroy.emit(this.idsOfSelectedTasks());
    });
  }

  idsOfSelectedTasks() {
    return Object.keys(this.selectedTasks).map((key) => {
      if(this.selectedTasks[key]) {return parseInt(key)};
    });
  }
}
