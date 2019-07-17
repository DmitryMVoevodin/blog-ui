import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { TopicsComponent } from './topics/topics.component';
import { AutherrComponent } from './autherr/autherr.component';
import {ReadArticleComponent} from './readarticle/readarticle.component';
import {AddingArticleComponent} from './addingarticle/addingarticle.component';
import {TemporaryComponent} from './temporary/temporary.component';
import {WritingArticleComponent} from './writingarticle/writingarticle.component';
import {AddingTopicComponent} from './addingtopic/addingtopic.component';
import {AdminTopicComponent} from './admintopic/admintopic.component';
import {AdminUserComponent} from './adminuser/adminuser.component';

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
  {path: "topics", component: TopicsComponent},
  {path: "admin/users", component: AdminUserComponent},
  {path: "admin/topics", component: AdminTopicComponent},
  {path: "topic/adding", component: AddingTopicComponent},
  {path: "topic/:topicId/article", component: AddingArticleComponent},
  {path: "topic/:topicId/article/:articleId", component: ReadArticleComponent},
  {path: "topic/:topicId/article/:articleId/edit", component: WritingArticleComponent},
  {path: "temporary", component: TemporaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
