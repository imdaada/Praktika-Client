import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Task} from './task';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }
  url = 'http://localhost:8080/';
  public addTask(task: Task): Observable<any> {
    return this.httpClient.post(this.url + 'task/addTask', task);
  }
  public deleteTask(task: Task): Observable<any> {
    return this.httpClient.post(this.url + 'task/delete', task);
  }
  public getTask(): Observable<any> {
    return this.httpClient.get(this.url + 'task');
  }
  public changeTask(task: Task): Observable<any> {
    return this.httpClient.post(this.url + 'task/change', task)
  }
  public getUserByLogin(login: string): Observable<any> {
    return this.httpClient.get(this.url + 'userApp/' + login);
  }
}
