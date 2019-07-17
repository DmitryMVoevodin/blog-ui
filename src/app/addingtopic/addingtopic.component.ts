import { Component, OnInit } from '@angular/core';
import {TopicService} from '../services/topic.service';
import {UserService} from '../services/user.service';
import {ArticleService} from '../services/article.service';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {Topic} from '../models/topic';

@Component({
  selector: 'app-addingtopic',
  templateUrl: './addingtopic.component.html',
  styleUrls: ['./addingtopic.component.css']
})
export class AddingTopicComponent implements OnInit {

  private user: User;
  private newTopic: Topic = new Topic();

  constructor(private userService: UserService, private topicService: TopicService, private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.userService.castUser.subscribe(user => this.user = user);
    this.newTopic.topicId = 0;
    this.newTopic.topicCreator = this.user;
    this.newTopic.topicTitle = '';
    this.newTopic.topicComment = '';
  }

  public addTopic(): void {
    this.topicService.addTopic(this.newTopic).subscribe(
      result => {
        if (result) {
          this.router.navigate(['topics']);
        }
        },
      error => {
        alert('An unexpected error occurred while sending a new topic to the administrator');
      }
      );
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
