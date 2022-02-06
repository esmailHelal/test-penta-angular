import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { EditAdsComponent } from './edit-ads/edit-ads.component';
import { CanActiveGuard } from 'src/app/guards/can-active.guard';
const routes: Routes = [
  { path: '', component: HomeComponent ,canActivate: [CanActiveGuard],},
  { path: 'add', component: AddAdsComponent ,canActivate: [CanActiveGuard],},
  { path: 'edit/:id', component: EditAdsComponent ,canActivate: [CanActiveGuard],},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
