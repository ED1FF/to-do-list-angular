import { Component, OnInit } from '@angular/core';
import { TaskAPI } from '../api/task';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-show',
  templateUrl: './task-show.component.html',
  styleUrls: ['./task-show.component.css']
})
export class TaskShowComponent implements OnInit {

  constructor(private taskAPI: TaskAPI, private route: ActivatedRoute) { }

  task:any = {};
  id:any;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadTasks()
  }

  loadTasks() {
    this.taskAPI.get(this.id).subscribe((data) => {
      this.task = data;
    })
  }

}
