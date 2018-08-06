import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TaskAPI } from '../api/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  tasks:any = [];
  done:boolean;

  constructor(private taskAPI: TaskAPI) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskAPI.query().subscribe((data) => {
      this.tasks = data;
    })
  }

  onCreate(task) {
    this.tasks.unshift(task);
  }

  onDestroy(task) {
    this.tasks = this.tasks.filter((item) => item.id != task.id )
  }

  onAllDestroy(ids) {
    this.tasks = this.tasks.filter((item) => !ids.includes(item.id) )
  }
}
