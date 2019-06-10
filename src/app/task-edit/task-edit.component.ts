import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { TaskAPI } from '../api/task';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent {

  taskForm: FormGroup;

  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Input() task:any = {};

  constructor(private fb: FormBuilder, private taskAPI: TaskAPI, private toastr: ToastrService) {
    this.editForm();
  }

  editForm() {
    this.taskForm = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  update() {
    this.taskAPI.update(this.task.id, { task: this.taskForm.value }).subscribe((data) => {
      this.onCancel.emit(this.task)
      Object.assign(this.task, data);
      this.toastr.success('Task was updated!');
    });
  }

  cancel() {
    this.onCancel.emit(this.task);
  }

}
