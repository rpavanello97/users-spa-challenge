import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  { path: '**', redirectTo: 'users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
