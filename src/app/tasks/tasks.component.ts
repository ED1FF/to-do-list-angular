import { Component, OnInit } from '@angular/core';
import { TaskAPI } from '../api/task'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:any = []

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
}
