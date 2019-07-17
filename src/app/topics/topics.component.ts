import { Component, OnInit } from '@angular/core';
import {Topic} from '../models/topic';
import {TopicService} from '../services/topic.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  private user: User;

  private topics: Topic[];

  private selectedTopic: Topic;

  private countOfTopicsForAdmin: number = 0;

  constructor(private userService: UserService, private topicService: TopicService, private router: Router) { }

  ngOnInit() {

    this.topicService.castTopicSelected.subscribe(topicSelected => this.selectedTopic = topicSelected);

    this.userService.castUser.subscribe(user => this.user = user);

    this.topicService.getAllTopics().subscribe(
      result => {
        if (result != null) {
          this.topics = result;
        }
      },
      error => {alert('An unexpected error occurred while getting topics');}
    );

    //For a Badge-component
    this.topicService.getAllTopicsForAdmin(this.user.userId).subscribe(
      result => {
        if (result != null) {
          this.countOfTopicsForAdmin = result.length;
        } else {
          this.countOfTopicsForAdmin = 0;
        }
      },
      error => {alert('An unexpected error occurred while getting topics for a badge');}
    );

  }

  public exitFromBlog(): void {
    this.userService.clearUser();
    this.router.navigate(['auth/sign_in']);
  }

  private addNewArticle(selectedTopic: Topic): void {
    this.topicService.editTopicSelected(selectedTopic);
    let urlAddNewArticle: string = 'topic/' + this.selectedTopic.topicId + '/article';
    this.router.navigate([urlAddNewArticle]);
  }

  private addingArticlePage(): void {
    this.router.navigate(['topic/adding']);
  }

  private deleteTopic(selectedTopic: Topic): void {
    this.topicService.deleteTopicById(selectedTopic.topicId, this.user.userId).subscribe(
      result => {
        if(result) {
          this.router.navigate(['temporary']);
        }
      },
      error => {alert('An expected error occurred while deleting the topic');}
    );
  }

  private adminTopicPage(): void {
    this.router.navigate(['admin/topics']);
  }

  private adminUserPage(): void {
    this.router.navigate(['admin/users']);
  }

}
