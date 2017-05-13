import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IsLoggedInGuard} from './shared/guards/is-logged-in.guard'
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    children: [],
    component: TodoComponent,
    canActivate: [IsLoggedInGuard]
  },
  { path: 'login', children: [], component: LoginComponent },
  { path: 'signup', component: SignupComponent}
  , { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
