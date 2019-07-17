import {Component, Input, OnInit} from '@angular/core';
import {Topic} from '../models/topic';
import {Article} from '../models/article';
import {TopicService} from '../services/topic.service';
import {ArticleService} from '../services/article.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  private user: User;

  @Input() topicId: number;

  private articles: Article[];

  constructor(private userService: UserService, private articleService: ArticleService, private router: Router) { }

  ngOnInit() {

    this.userService.castUser.subscribe(user => this.user = user);
    this.getAllArticlesForTopic(this.topicId, this.user.userId);

  }


  public getAllArticlesForTopic(topicId: number, userId: number): void {
    this.articleService.getAllArticlesForTopic(topicId, userId).subscribe(
      result => {
        if (result != null) {
          this.articles = result;
        }
      },
      error => {alert('An unexpected error occurred while getting articles');}
    );
  }

}
