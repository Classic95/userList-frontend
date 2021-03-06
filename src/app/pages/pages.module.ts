import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from '../pipe/age.pipe';
import { UserCardComponent } from './user-card/user-card.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    DashboardComponent,
    AgePipe,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule
  ],
  exports: [UserCardComponent],
  providers: [AgePipe],

})
export class PagesModule { }
