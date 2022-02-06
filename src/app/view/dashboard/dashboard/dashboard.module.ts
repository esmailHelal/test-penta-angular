import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EditAdsComponent } from './edit-ads/edit-ads.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddAdsComponent,
    EditAdsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
  ] ,providers: [
    DatePipe
   
  ],
})
export class DashboardModule { }
