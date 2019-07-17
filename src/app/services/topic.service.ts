import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {Topic} from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private urlBase: string = 'http://localhost:8080'
  private urlTopic: string = '/topic';
  private urlTopicDelete: string = '/delete';
  private urlTopicAdding: string = '/adding';
  private urlAdmin: string = '/admin';

  private topicSelected = new BehaviorSubject<Topic>(new Topic());
  castTopicSelected = this.topicSelected.asObservable();

  public getAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.urlBase + this.urlTopic);
  }

  constructor(private http: HttpClient) { }


  public editTopicSelected(newTopic: Topic): void {
    this.topicSelected.next(newTopic);
  }

  public clearTopicSelected(): void {
    let topicZero: Topic = new Topic();
    this.editTopicSelected(topicZero);
  }

  public deleteTopicById(topicId: number, userId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.urlBase + this.urlTopic + ('/' + topicId) + this.urlTopicDelete,
      {params: {userId: userId + ''}});
  }

  public addTopic(topic: Topic): Observable<boolean> {
    return this.http.post<boolean>(this.urlBase + this.urlTopic + this.urlTopicAdding, topic);
  }

  public getAllTopicsForAdmin(userId: number): Observable<Topic[]> {
    let params = new HttpParams().set("userId", (userId + ""));
    return this.http.get<Topic[]>(this.urlBase + this.urlAdmin + this.urlTopic, {params});
  }

  public deleteTopicByIdForAdmin(topicId: number, userId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.urlBase + this.urlAdmin + this.urlTopic + ('/' + topicId),
      {params: {userId: userId + ''}});
  }

  public acceptTopicByIdForAdmin(topicId: number, userId: number): Observable<boolean> {
    return this.http.post<boolean>(this.urlBase + this.urlAdmin + this.urlTopic + ('/' + topicId), userId);
  }

}
