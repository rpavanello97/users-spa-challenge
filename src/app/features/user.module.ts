import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class UserModule { }
