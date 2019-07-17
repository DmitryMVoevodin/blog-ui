import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SignComponent } from './sign/sign.component';
import { RegComponent } from './reg/reg.component';
import { TopicsComponent } from './topics/topics.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { AutherrComponent } from './autherr/autherr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ArticlesComponent } from './articles/articles.component';
import { ReadArticleComponent } from './readarticle/readarticle.component';
import { CommentsComponent } from './comments/comments.component';
import { AddingArticleComponent } from './addingarticle/addingarticle.component';
import { ArticlechangingpanelComponent } from './articlechangingpanel/articlechangingpanel.component';
import { TemporaryComponent } from './temporary/temporary.component';
import { WritingArticleComponent } from './writingarticle/writingarticle.component';
import { AddingTopicComponent } from './addingtopic/addingtopic.component';
import { AdminTopicComponent } from './admintopic/admintopic.component';
import { AdminUserComponent } from './adminuser/adminuser.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignComponent,
    RegComponent,
    TopicsComponent,
    FirstpageComponent,
    AutherrComponent,
    ArticlesComponent,
    ReadArticleComponent,
    CommentsComponent,
    AddingArticleComponent,
    ArticlechangingpanelComponent,
    TemporaryComponent,
    WritingArticleComponent,
    AddingTopicComponent,
    AdminTopicComponent,
    AdminUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
