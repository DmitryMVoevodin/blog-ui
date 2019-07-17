import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {UserValidation} from '../models/userv';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  private userV: UserValidation = {
    userLastNameValidation: ' ',
    userFirstNameValidation: ' ',
    userMiddleNameValidation: ' ',
    userMailValidation: ' ',
    userPhoneValidation: ' ',
    userLoginValidation: ' ',
    userPasswordValidation: ' ',
    userNickNameValidation: ' '
  };

  public user: User;

  public registerAndEnterBlog(): void {
    if (this.checkValidation()) {
      this.userService.registerAndEnter(this.user)
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
          error => {alert('An unexpected error occurred while registering and entering an account');}
        );
    }
  }

  constructor(private userService: UserService, private router: Router) { }

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

  private checkValidation(): boolean {

    let isValid = true;
    this.userV.userLastNameValidation = ' ';
    this.userV.userFirstNameValidation = ' ';
    this.userV.userMiddleNameValidation = ' ';
    this.userV.userMailValidation = ' ';
    this.userV.userPhoneValidation = ' ';
    this.userV.userLoginValidation = ' ';
    this.userV.userPasswordValidation = ' ';
    this.userV.userNickNameValidation = ' ';

    //Фамилия
    if (this.user.userLastName.length == 0) {
      isValid = false;
      this.userV.userLastNameValidation = 'Значение не должно быть пустым!';
    } else if (this.user.userLastName.length > 20) {
      isValid = false;
      this.userV.userLastNameValidation = 'Поле не должно быть > 20 символов!';
    } else {
      var regLastName = /[\,;":'a-zA-Zа-яА-Я]/;
      if (!regLastName.test(this.user.userLastName)) {
        isValid = false;
        this.userV.userLastNameValidation = 'Фамилия введена некорректно!';
      }
    }

    //Имя
    if (this.user.userFirstName.length == 0) {
      isValid = false;
      this.userV.userFirstNameValidation = 'Значение не должно быть пустым!';
    } else if (this.user.userFirstName.length > 20) {
      isValid = false;
      this.userV.userFirstNameValidation = 'Поле не должно быть > 20 символов!';
    }

    //Отчество
    if (this.user.userMiddleName.length == 0) {
      isValid = false;
      this.userV.userMiddleNameValidation = 'Значение не должно быть пустым!';
    } else if (this.user.userMiddleName.length > 20) {
      isValid = false;
      this.userV.userMiddleNameValidation = 'Поле не должно быть > 20 символов!';
    }

    //E-mail
    if (this.user.userMail.length == 0) {
      isValid = false;
      this.userV.userMailValidation = 'Значение не должно быть пустым!';
    } else if (this.user.userMail.length > 20) {
      isValid = false;
      this.userV.userMailValidation = 'Поле не должно быть > 20 символов!';
    } else {
      var regMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!regMail.test(this.user.userMail)) {
        isValid = false;
        this.userV.userMailValidation = 'Адрес введен некорректно!';
      }
    }

    //Телефон
    if (this.user.userPhone.length == 0) {
      isValid = false;
      this.userV.userPhoneValidation = 'Значение не должно быть пустым!';
    } else if (this.user.userPhone.length > 20) {
      isValid = false;
      this.userV.userPhoneValidation = 'Поле не должно быть > 20 символов!';
    } else {
      var regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      if (!regPhone.test(this.user.userPhone)) {
        isValid = false;
        this.userV.userPhoneValidation = 'Номер телефона введен некорректно!';
      }
    }

    //Логин
    if (this.user.userLogin.length == 0) {
      isValid = false;
      this.userV.userLoginValidation = 'Значение не должно быть пустым!';
    } else if (this.user.userLogin.length > 20) {
      isValid = false;
      this.userV.userLoginValidation = 'Поле не должно быть > 20 символов!';
    }

    //Пароль
    if (this.user.userPassword.length == 0) {
      isValid = false;
      this.userV.userPasswordValidation = 'Значение не должно быть пустым!';
    } else if (this.user.userPassword.length > 20) {
      isValid = false;
      this.userV.userPasswordValidation = 'Поле не должно быть > 20 символов!';
    }

    //Никнейм
    if (this.user.userNickName.length == 0) {
      isValid = false;
      this.userV.userNickNameValidation = 'Значение не должно быть пустым!';
    } else if (this.user.userNickName.length > 20) {
      isValid = false;
      this.userV.userNickNameValidation = 'Поле не должно быть > 20 символов!';
    }

    return isValid;
  }


}
