import { Component, OnInit } from '@angular/core';
import {RegisterRequest} from './register-request';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    this.registerRequest = new RegisterRequest();
  }
  registerRequest: RegisterRequest;

  ngOnInit(): void {
  }

  submit() {
    this.userService.register(this.registerRequest).subscribe(
      value => {
        alert('Вы успешно зарегистрированлсь, войдите в систему');
        this.router.navigateByUrl('/login');
      },
      error => {
        alert('Ошибка при регистрации! Возможно, введённый вами логин уже используется!');
      }
    );
  }
}
