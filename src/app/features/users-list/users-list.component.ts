import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../services/user.service';
import { AlertData } from 'src/app/shared/models/alert-data.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  id!: number;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.userService.get().subscribe((users: User[]) => {
      this.users.push(...users);
    }, (err: Error) => {
      alert(err.stack)
    })
  }

  getIdToDelete(id: number): void {
    this.id = id;
    this.openDialog();
  }

  openDialog(): void {

    const data: AlertData = {
      title: "Are you sure to delete the User?",
      description: "If you want to continue, please press \"Yes\"",
      negativeButton: "No",
      positiveButton: "Yes"
    }

    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteById(this.id)
      } else {
        alert("Recused")
      }
    });
  }

}
