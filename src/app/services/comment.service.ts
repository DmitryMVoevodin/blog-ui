import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private urlBase: string = 'http://localhost:8080';
  private urlTopic: string = '/topic';
  private urlArticle: string = '/article';
  private urlComment: string = '/comment';
  private urlCommentingAvailability: string = '/availability';

  public getAllCommentsForArticle(topicId: number, articleId: number, userId: number): Observable<Comment[]> {
    let params = new HttpParams().set("userId", (userId + ""));
    return this.http.get<Comment[]>(
      (this.urlBase + this.urlTopic) + ("/" + topicId) + this.urlArticle + ("/" + articleId) + this.urlComment,
      {params});
  }

  public isCommentingAvailableForArticle(topicId: number, articleId: number, userId: number): Observable<boolean> {
    return this.http.post<boolean>(
      (this.urlBase + this.urlTopic) + ("/" + topicId) + this.urlArticle + ("/" + articleId) +
      this.urlComment + this.urlCommentingAvailability, userId);
  }

  public addComment(topicId: number, articleId: number, userId: number, commentContent: string): Observable<boolean> {
    let bodyPostForComment: any[] = [userId, commentContent];
    return this.http.post<boolean>(
      (this.urlBase + this.urlTopic) + ("/" + topicId) + this.urlArticle + ("/" + articleId) + this.urlComment,
      bodyPostForComment);
  }

  public deleteCommentById(topicId: number, articleId: number, userId: number, commentId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      (this.urlBase + this.urlTopic) + ("/" + topicId) + this.urlArticle + ("/" + articleId) + this.urlComment + ("/" + commentId),
      {params: {userId: userId + ""}});
  }

  constructor(private http: HttpClient) { }

}
