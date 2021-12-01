import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../services/user.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { AlertData } from 'src/app/shared/models/alert-data.model';
import { ValidateErrorsService } from '../services/validate-fields.service'

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  user!: FormGroup
  defaultPhoto: string = 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    public validation: ValidateErrorsService
  ) { }

  get controls() {
    return this.user.controls
  }

  ngOnInit(): void {
    this.createForm(this.generateBlankUser())
  }

  submit(): void {
    this.user.markAllAsTouched()

    if(this.user.invalid) {
      return
    }

    const userSave = this.user.getRawValue()
    this.save(userSave)
  }

  routeUserList() : void {
    this.router.navigateByUrl('/users')
  }

  getFormControl(name:string): AbstractControl {
    return this.user.controls[name]
  }

  private createForm(user: User): void {
    this.user = this.formBuilder.group({
      name: [user.name, [Validators.required]],
      profileUrl: [user.profileUrl],
      email: [user.email, [Validators.required]],
      addedOn: [user.addedOn, [Validators.required]],
      role: [user.role, [Validators.required]]
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
  
  private save(user: User): void {
    this.userService.save(user).subscribe( result => {
      const data: AlertData = {
        title: `Suceess`,
        description: "Your data has been successfully saved.",
        positiveButton: "Nice"
      }

      const dialogRef = this.dialog.open(AlertComponent, { width: '500px', data })

      dialogRef.afterClosed().subscribe(() => {
        this.routeUserList()
      })
    }, (error: Error) => {
      const data: AlertData = {
        title: `Failed`,
        description: "Your data has NOT been saved.",
        positiveButton: "Oh no!!!",
        hasNegativeButton: false
      }

      this.dialog.open(AlertComponent, { width: '500px', data })
    })
  }

}
