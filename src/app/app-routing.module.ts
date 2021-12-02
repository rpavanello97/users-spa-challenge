import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterUserComponent } from './features/register-user/register-user.component';
import { UsersListComponent } from './features/users-list/users-list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path:'users',
    component: UsersListComponent
  },
  {
    path:'register',
    children : [
      {
        path:'',
        component: RegisterUserComponent
      },
      {
        path:':id',
        component: RegisterUserComponent
      },      
    ]
  },
  { path: '**', redirectTo: 'users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
