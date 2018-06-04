
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '@app/layout/main/main.component';
import { LoginComponent } from '@app/pages/login/login.component';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';
import { AuthGuard } from '@app/_guards/auth.guard';
import { LoggedGuard } from '@app/_guards/logged.guard';
import { CategoriasComponent } from '@app/pages/categorias/categorias.component';

const routes: Routes = [
  // { path: '', component: MainComponent, canActivate: [AuthGuard], children:[
     { path: '', component: MainComponent, children:[
      { path: 'dashboard', component: DashboardComponent },
      { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'categorias', component: CategoriasComponent }
  ] },
  //  { path: 'login', component: LoginComponent, canActivate:[LoggedGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
