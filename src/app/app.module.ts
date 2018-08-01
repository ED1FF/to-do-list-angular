import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppRoutingModule } from './routes';
import { TaskListComponent } from './task-list/task-list.component'
import { TaskAPI } from './api/task';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskComponent } from './task/task.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { TaskShowComponent } from './task-show/task-show.component';
import { BackButtonDirective } from './back-button.directive'

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskComponent,
    TaskEditComponent,
    FilterByPipe,
    TaskShowComponent,
    BackButtonDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [TaskAPI],
  bootstrap: [AppComponent]
})
export class AppModule { }
