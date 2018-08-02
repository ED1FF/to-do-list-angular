import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { TokenExpiredInterceptor } from './auth/token-expired.interceptor';
import { AuthGuardService } from './auth/auth-guard.service';
import { SignInGuardService } from './auth/sign-in-guard.service';
import { TaskAPI } from './api/task';
import { UserAPI } from './api/user';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppRoutingModule } from './routes';
import { TaskListComponent } from './task-list/task-list.component'
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskComponent } from './task/task.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { TaskShowComponent } from './task-show/task-show.component';
import { BackButtonDirective } from './back-button.directive';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component'

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
    BackButtonDirective,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule
  ],
  providers: [
    TaskAPI,
    UserAPI,
    AuthGuardService,
    SignInGuardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpiredInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
