import { AuthLoginGuard } from './../auth/auth.login.guard';
import { CategoriasComponent } from './../pages/categorias/categorias.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutComponent } from './../layout/app-layout/app-layout.component';
import { LoginComponent } from './../pages/login/login.component';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';
import { AuthGuard } from "./../auth/auth.guard";

const routes: Routes = [
  // { path: '', component: AppLayoutComponent, canActivate: [AuthGuard], children:[
    { path: '', component: AppLayoutComponent, children:[
      { path: 'dashboard', component: DashboardComponent },
      { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'categorias', component: CategoriasComponent }
  ] },
  // { path: 'login', component: LoginComponent, canActivate:[AuthLoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
