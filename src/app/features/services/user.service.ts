import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigParams } from 'src/app/shared/models/config-params.model';
import { User } from 'src/app/shared/models/user.model';

const url = "http://localhost:3000/users/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<User[]> {
    // let params = new HttpParams().set('id', id.toString())
    return this.http.get<User[]>(url)
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(url + id)
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(url + id)
  }

  save(user: User): Observable<void> {
    return this.http.post<void>(url, user)
  }

  edit(user: User): Observable<void> {
    return this.http.put<void>(url + user.id, user)
  }
}
