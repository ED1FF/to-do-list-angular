import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskAPI } from '../api/task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Output() onCreate: EventEmitter<any> = new EventEmitter();

  taskForm = new FormGroup ({
    name: new FormControl()
  });

  task:any = []

  constructor(private fb: FormBuilder, private taskAPI: TaskAPI, private toastr: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  create() {
    this.taskAPI.create({ task: this.taskForm.value }).subscribe((data) => {
      this.task = data;
      this.taskForm.reset();
      this.toastr.success('Task was created!');
      this.onCreate.emit(data);
    })
  }

  ngOnInit() {
  }

}
