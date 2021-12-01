import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  user!: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm(this.generateBlankUser())
  }

  submit(): void {
    console.log("passed here")
  }

  private createForm(user: User): void {
    this.user = this.formBuilder.group({
      name: [user.name],
      profileUrl: [user.profileUrl],
      email: [user.email],
      addedOn: [user.addedOn],
      role: [user.role]
    })
  }

  private generateBlankUser(): User {
    return {
      id: null,
      name: null,
      profileUrl: null,
      email: null,
      addedOn: null,
      role: null
    } as unknown as User
  }  

}
