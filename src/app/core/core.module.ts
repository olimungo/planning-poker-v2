import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { CoreGridComponent } from './grid/grid.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './users-list/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CoreGridComponent,
    UsersListComponent
  ],
  declarations: [
    CoreGridComponent,
    UsersListComponent,
    UserComponent
  ]
})
export class CoreModule { }
