import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeComponent } from './pages/compose/compose.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { LoginComponent } from './pages/login/login.component';
import { OutboxComponent } from './pages/outbox/outbox.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'outbox',
    component: OutboxComponent
  },
  {
    path: 'compose',
    component: ComposeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
