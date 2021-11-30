import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    MatIconModule
  ]
})
export class UserModule { }
