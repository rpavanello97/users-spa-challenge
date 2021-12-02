import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../services/user.service';
import { AlertData } from 'src/app/shared/models/alert-data.model';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  //encapsulation: ViewEncapsulation.None //To tooltip work
})
export class UsersListComponent implements OnInit {

  users: User[] = []
  id!: number
  footerMsg: string = "Developed during \"Angular Bootcamp\" from Diggital Innovation One by Rafael Bertolim Pavanello"
  noUsersMsg: string = "No users to show"

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.get().subscribe((users: User[]) => {
      this.users.push(...users);
    }, (err: Error) => {
      alert(err.stack)
    });
  }

  delete(user: User): void {
    this.id = user.id

    const data: AlertData = {
      title: `Are you sure to delete "${user.name}" ?`,
      description: "If you want to continue, please press \"Yes\"",
      negativeButton: "No",
      positiveButton: "Yes",
      hasNegativeButton: true,
      negativeColor: "primary",
      positiveColor: "warn"
    }

    const dialogRef = this.dialog.open(AlertComponent, { width: '500px', data })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteById(this.id).subscribe(() => {
          this.users = this.users.filter(item => item.id !== this.id)
          //this.getUsers()
        });
      }
    });
  }

  registerUser(): void {
    this.router.navigateByUrl('register')
  }

  edit(user: User): void {
    this.router.navigateByUrl('register/' + user.id)
  }
}
