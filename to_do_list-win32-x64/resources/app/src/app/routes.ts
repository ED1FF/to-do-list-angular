import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskShowComponent } from './task-show/task-show.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { SignInGuardService } from './auth/sign-in-guard.service';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: TasksComponent
      },
      {
        path: ':id',
        component: TaskShowComponent
      }
    ]
  },
  {
    path: 'sign_up',
    component: SignUpComponent,
    canActivate: [SignInGuardService]
  },
  {
    path: 'sign_in',
    component: SignInComponent,
    canActivate: [SignInGuardService]
  },
  {
    path: 'profile',
    component: UserEditComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
