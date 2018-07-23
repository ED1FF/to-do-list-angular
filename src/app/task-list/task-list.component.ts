import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})

export class TaskListComponent {
  @Input() tasks:any = [];

  onDelete(task) {
    this.tasks = this.tasks.filter((item) => item.id != task.id )
  }
}
