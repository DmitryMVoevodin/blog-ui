import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {TopicService} from '../services/topic.service';
import {UserService} from '../services/user.service';
import {ArticleService} from '../services/article.service';
import {Router} from '@angular/router';
import {Topic} from '../models/topic';

@Component({
  selector: 'app-admintopic',
  templateUrl: './admintopic.component.html',
  styleUrls: ['./admintopic.component.css']
})
export class AdminTopicComponent implements OnInit {

  private user: User;
  private topics: Topic[] = null;

  constructor(private userService: UserService, private topicService: TopicService, private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.userService.castUser.subscribe(user => this.user = user);
    this.topicService.getAllTopicsForAdmin(this.user.userId).subscribe(
      result => {
        if (result != null) {
          this.topics = result;
        } else {
          this.topics = null;
        }
      },
      error => {alert('An unexpected error occurred while getting topics');}
    );
  }

  public acceptTopic(topic: Topic): void {
    this.topicService.acceptTopicByIdForAdmin(topic.topicId, this.user.userId).subscribe(
      result => {
        if (result) {

          this.topicService.getAllTopicsForAdmin(this.user.userId).subscribe(
            resultGet => {
              if (resultGet != null) {
                this.topics = resultGet;
              } else {
                this.topics = null;
              }
            },
            errorGet => {alert('An unexpected error occurred while getting topics');}
          );

        }
      },
      error => {alert('An unexpected error occurred while accepting the topic');}
    );
  }

  public refuseTopic(topic: Topic): void {
    this.topicService.deleteTopicByIdForAdmin(topic.topicId, this.user.userId).subscribe(
      result => {
        if (result) {

          this.topicService.getAllTopicsForAdmin(this.user.userId).subscribe(
            resultGet => {
              if (resultGet != null) {
                this.topics = resultGet;
              } else {
                this.topics = null;
              }
            },
            errorGet => {alert('An unexpected error occurred while getting topics');}
          );

        }
      },
      error => {alert('An unexpected error occurred while deleting the topic');}
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
