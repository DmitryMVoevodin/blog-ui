import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../models/article';
import {User} from '../models/user';
import {Topic} from '../models/topic';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ArticleService} from '../services/article.service';
import {TopicService} from '../services/topic.service';

@Component({
  selector: 'app-articlechangingpanel',
  templateUrl: './articlechangingpanel.component.html',
  styleUrls: ['./articlechangingpanel.component.css']
})
export class ArticlechangingpanelComponent implements OnInit {

  @Input() user: User;
  @Input() topic: Topic;
  @Input() article: Article;

  private isEditingAvailable: boolean = false;


  constructor(private userService: UserService, private articleService: ArticleService, private topicService: TopicService, private router: Router) { }

  ngOnInit() {
    this.articleService.isEditingAvailableForArticle(this.article, this.user.userId).subscribe(
      result => {
        if (result != null) {
          this.isEditingAvailable = result;
        }
      },
      error => {alert('An unexpected error occurred while getting rights of editing');}
    );
  }

  private readArticle(topicId: number, articleId: number): void {
    this.articleService.setSelectedId(topicId, articleId);
    let linkToReadArticle: string = 'topic/' + topicId + '/article/' + articleId;
    this.router.navigate([linkToReadArticle]);
  }

  private writeArticle(): void {
    this.articleService.setSelectedArticle(this.article);
    this.topicService.editTopicSelected(this.article.articleTopic);
    let urlWriteArticle: string = 'topic/' + this.article.articleTopic.topicId + '/article' +
      '/' + this.article.articleId + '/edit';
    this.router.navigate([urlWriteArticle]);
  }

  private deleteArticleById(): void {
    this.articleService.deleteArticleById(this.topic.topicId, this.article.articleId, this.user.userId).subscribe(
      result => {
        this.router.navigate(['temporary']);
      },
      error => {alert('An expected error occurred while deleting the article');}
    );
  }

}
