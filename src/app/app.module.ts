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

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignComponent,
    RegComponent,
    TopicsComponent,
    FirstpageComponent,
    AutherrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
