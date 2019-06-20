import {Injectable, Input} from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEnter: string = 'http://localhost:8080/user/enter';
  private urlRegister: string = 'http://localhost:8080/user';

  public enterLoginPassword(dataLoginPassword: string[]): Observable<User> {
    return this.http.post<User>(this.urlEnter, dataLoginPassword);
  }

  public registerAndEnter(newUser: User): Observable<User> {
    return this.http.post<User>(this.urlRegister, newUser);
  }

  constructor(private http: HttpClient) { }
}
