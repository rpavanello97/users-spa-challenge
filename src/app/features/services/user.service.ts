import { HttpClient } from '@angular/common/http';
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
    private http:HttpClient
  ) { }

  get(): Observable<User[]> {
    // configParams: ConfigParams
    return this.http.get<User[]>(url);
  }

  deleteById(id:number): Observable<void> {
    debugger;
    return this.http.delete<void>(url+id);
  }
}
