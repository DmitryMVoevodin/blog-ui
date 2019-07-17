import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  private user: User;

  private dataLoginPassword: string[] = ['', ''];

  public enterBlog(login: string, password: string): void {
    this.dataLoginPassword[0] = login;
    this.dataLoginPassword[1] = password;
    this.userService.enterLoginPassword(this.dataLoginPassword)
      .subscribe(
        result => {
            if (result != null) {
              this.editUser(result);
              this.router.navigate(['/topics']);
            } else {
              this.clearUser();
              this.router.navigate(['auth/autherr']);
            }
          },
        error => {alert('An unexpected error occurred while entering an account');}
      );

  }

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.castUser.subscribe(user => this.user = user);
  }

  private editUser(newUser: User): void {
    this.user = newUser;
    this.userService.editUser(newUser);
  }
  private clearUser(): void {
    this.userService.clearUser();
  }

}
