import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Task} from './task';
import {User} from './user';
import {TaskService} from './task.service';
import {CookieService} from 'ngx-cookie-service';
import {timeSinceInMicros} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  role: string;
  newTask: Task;
  users: User[];
  tasks: Task[];

  constructor(private userService: UserService, private taskService: TaskService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userService.role().subscribe(value => {
      console.log(value);
      this.role = value.role;
    },
      error => {
      console.log(error);
      });
    this.newTask = new Task();
    this.newTask.studentLogin = new User();
    this.users = new User()[50];
    this.tasks = [];
    this.getTasks();
  }

  submit() {
    this.newTask.teacherLogin = new User();
    this.taskService.addTask(this.newTask).subscribe((task: Task) => {
      console.log(task);
      this.getTasks();
      },
      error => {
      console.log(error);
      });
  }
  insertLogin(login: string) {
    this.newTask.studentLogin.login = login;
    this.users = [];
  }

  findLogin() {
    this.taskService.getUserByLogin(this.newTask.studentLogin.login).subscribe(
      (users: User[]) => {
        this.users = users;
        console.log(users);
      },
      error => {}
    );
  }

  deleteTask(task: Task) {
    const conf = confirm('Удалить задние №' + task.id);
    if (conf) {
      this.taskService.deleteTask(task).subscribe(
        value => {
          this.getTasks();
        },
        error => {
        }
      );
    }
  }

  getTasks() {
    this.taskService.getTask().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error => {}
    );
  }

  change(task: Task) {
    this.taskService.changeTask(task).subscribe(
      value => {
        this.getTasks();
      },
      error => {}
    );
  }
}
