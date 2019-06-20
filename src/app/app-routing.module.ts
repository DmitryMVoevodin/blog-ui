import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { TopicsComponent } from './topics/topics.component';
import { AutherrComponent } from './autherr/autherr.component';

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: FirstpageComponent},
  {
    path: 'auth', component: AuthComponent,
    children: [
      {path: 'sign_in', component: SignComponent},
      {path: 'registration', component: RegComponent},
      {path: 'autherr', component: AutherrComponent}
    ]
  },
  {path: "topics", component: TopicsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
