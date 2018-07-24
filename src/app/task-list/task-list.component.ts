import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})

export class TaskListComponent {
  @Input() tasks:any = [];
  @Input() done: boolean;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter();

  onDelete(task) {
    this.onDestroy.emit(task)
  }
}
