import { AuthLoginGuard } from './auth/auth.login.guard';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppHeaderComponent } from './layout/app-header/app-header.component';
import { AppSidenavComponent } from './layout/app-sidenav/app-sidenav.component';
import { AppSidenavService } from 'src/app/layout/app-sidenav/app-sidenav.service';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { AppConfig } from "./app.config";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppLayoutComponent,
    DashboardComponent,
    AppHeaderComponent,
    AppSidenavComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
  ],
  providers: [AppSidenavService, AuthService, AuthGuard, AuthLoginGuard, AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
