import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppRoutingModule } from './routes';
import { TaskListComponent } from './task-list/task-list.component'
import { TaskAPI } from './api/task';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskComponent } from './task/task.component'

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [TaskAPI],
  bootstrap: [AppComponent]
})
export class AppModule { }
