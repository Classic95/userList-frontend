import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from '../pipe/age.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    AddEditUserComponent,
    AgePipe,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AgePipe],
})
export class PagesModule { }
