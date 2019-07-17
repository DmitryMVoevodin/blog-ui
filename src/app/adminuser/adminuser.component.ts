import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {ArticleService} from '../services/article.service';
import {Topic} from '../models/topic';
import {TopicService} from '../services/topic.service';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminUserComponent implements OnInit {

  private user: User;
  private allAccounts: User[] = null;

  constructor(private userService: UserService, private topicService: TopicService, private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.userService.castUser.subscribe(user => this.user = user);
    if(this.user.userAdmin) {
      this.userService.getAllUsers(this.user.userId).subscribe(
        result => {
          if (result != null) {
            this.allAccounts = result;
          } else {
            this.allAccounts = null;
          }
        },
        error => {alert('An unexpected error occurred while getting accounts');}
      );
    } else {
      this.allAccounts = null;
    }
  }

  public deleteAccount(account: User): void {

    if(this.user.userAdmin) {
      this.userService.deleteAccountByIdForAdmin(account.userId, this.user.userId).subscribe(
        result => {
          if (result) {

            this.userService.getAllUsers(this.user.userId).subscribe(
              resultGet => {
                if (resultGet != null) {
                  this.allAccounts = resultGet;
                } else {
                  this.allAccounts = null;
                }
              },
              errorGet => {alert('An unexpected error occurred while getting accounts');}
            );

          }
        },
        error => {alert('An unexpected error occurred while deleting the account');}
      );
    }

  }

  public exitFromBlog(): void {
    this.topicService.clearTopicSelected();
    this.userService.clearUser();
    this.router.navigate(['auth/sign_in']);
  }

  public returnToTopics(): void {
    this.topicService.clearTopicSelected();
    this.router.navigate(['topics']);
  }

}
