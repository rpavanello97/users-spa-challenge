import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../services/user.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { AlertData } from 'src/app/shared/models/alert-data.model';
import { ValidateErrorsService } from '../services/validate-fields.service'

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  //encapsulation: ViewEncapsulation.None //To tooltip work
})
export class RegisterUserComponent implements OnInit {

  user!: FormGroup
  defaultPhoto: string = 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'
  userBarMsg: string = ""
  id!: number

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public validation: ValidateErrorsService
  ) { }

  get controls() {
    return this.user.controls
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))

    if (this.id) {
      this.userBarMsg = 'Edit user'
      this.getById(this.id)
    } else {
      this.userBarMsg = 'Register new user'
      this.createForm(this.generateBlankUser())
    }
  }

  submit(): void {
    this.user.markAllAsTouched()

    if (this.user.invalid) {
      return
    }

    const userSave = this.user.getRawValue()

    if (!userSave.profileUrl) {
      userSave.profileUrl = this.defaultPhoto
    }

    if (this.id) {
      userSave.id = this.id
      this.edit(userSave)
    } else {
      this.save(userSave)
    }    
  }

  routeUserList(): void {
    this.router.navigateByUrl('/users')
  }

  getFormControl(name: string): AbstractControl {
    return this.user.controls[name]
  }

  private createForm(userObj: User): void {
    this.user = this.formBuilder.group({
      name: [userObj.name, [Validators.required]],
      profileUrl: [userObj.profileUrl],
      email: [userObj.email, [Validators.required]],
      addedOn: [userObj.addedOn, [Validators.required]],
      role: [userObj.role, [Validators.required]]
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
    this.userService.save(user).subscribe(result => {
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

  private getById(id: number): void {
    this.userService.getById(this.id).subscribe((userEdit: User) => {
      this.createForm(userEdit)
    }, (error: Error) => {
      alert("Error to get the user: " + "\"" + error.message + "\"")
    })
  }

  private edit(user: User): void {
    this.userService.edit(user).subscribe(result => {
      const data: AlertData = {
        title: `Suceess`,
        description: "Your data has been successfully edited.",
        positiveButton: "Nice"
      }

      this.dialog.open(AlertComponent, { width: '500px', data })
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
