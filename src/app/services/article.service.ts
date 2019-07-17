import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../models/article';
import { BehaviorSubject } from 'rxjs';
import {User} from '../models/user';
import {Topic} from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private urlBase: string = 'http://localhost:8080'
  private urlTopic: string = '/topic';
  private urlArticle: string = '/article';
  private urlRights: string = '/availability';
  private urlSettings: string = '/group';

  private articleSelectedId = new BehaviorSubject<number>(0);
  castArticleSelected = this.articleSelectedId.asObservable();
  private topicSelectedId = new BehaviorSubject<number>(0);
  castTopicSelected = this.topicSelectedId.asObservable();

  private articleSelectedForWriting = new BehaviorSubject<Article>(new Article());
  castArticleSelectedForWriting = this.articleSelectedForWriting.asObservable();

  public getAllArticlesForTopic(topicId: number, userId: number): Observable<Article[]> {
    let params = new HttpParams().set("userId", (userId + ""));
    return this.http.get<Article[]>((this.urlBase + this.urlTopic) + ("/" + topicId), {params});
  }

  public getArticleById(topicId: number, articleId: number, userId: number): Observable<Article> {
    let params = new HttpParams().set("userId", (userId + ""));
    return this.http.get<Article>((this.urlBase + this.urlTopic) + ("/" + topicId) + this.urlArticle + ("/" + articleId), {params});
  }

  public addArticle(topicId: number, article: Article): Observable<number> {
    return this.http.post<number>((this.urlBase + this.urlTopic) + ("/" + topicId), article);
  }

  public writeArticle(article: Article, userId: number): Observable<boolean> {
    let params = new HttpParams().set("userId", (userId + ""));
    return this.http.put<boolean>(
      (this.urlBase + this.urlTopic) +
      ("/" + article.articleTopic.topicId) +
      this.urlArticle + ("/" + article.articleId),
      article, {params});
  }

  public deleteArticleById(topicId: number, articleId: number, userId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      (this.urlBase + this.urlTopic) + ("/" + topicId) + this.urlArticle + ("/" + articleId),
      {params: {userId: userId + ""}});
  }

  public isEditingAvailableForArticle(article: Article, userId: number): Observable<boolean> {
    return this.http.post<boolean>((this.urlBase + this.urlTopic) +
      ("/" + article.articleTopic.topicId) + this.urlArticle + ("/" + article.articleId) + this.urlRights,
      userId);
  }

  public addSettingsForOnePersonInGroup(topicId: number, articleId: number, nicknameAndRights: string[]): Observable<boolean>{
    return this.http.post<boolean>((this.urlBase + this.urlTopic) +
      ("/" + topicId) + this.urlArticle + ("/" + articleId) + this.urlSettings,
      nicknameAndRights);
  }

  public deleteSettingsForOnePersonInGroup(topicId: number, articleId: number): Observable<boolean>{
    return this.http.delete<boolean>((this.urlBase + this.urlTopic) +
      ("/" + topicId) + this.urlArticle + ("/" + articleId) + this.urlSettings);
  }

  constructor(private http: HttpClient) { }

  public setSelectedId(topicSelectedId: number, articleSelectedId: number): void {
    this.topicSelectedId.next(topicSelectedId);
    this.articleSelectedId.next(articleSelectedId);
  }

  public setSelectedArticle(article: Article): void {
    this.articleSelectedForWriting.next(article);
  }

}
