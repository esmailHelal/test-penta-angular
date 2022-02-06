import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ { path: '', redirectTo: '/home', pathMatch: 'full' },
{
  path: 'home',
  loadChildren: () =>
    import('./../app/view/home/home.module').then((m) => m.HomeModule),
}, {
  path: 'dashboard',
  loadChildren: () =>
    import('./../app/view/dashboard/dashboard.module').then((m) => m.DashboardModule),
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
