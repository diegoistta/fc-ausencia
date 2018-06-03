
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/_material/material.module';
import { AppRoutingModule } from '@app/_routes/app-routing.module';
import { MomentModule } from 'ngx-moment';

import { AppComponent } from '@app/app.component';
import { LoginComponent } from '@app/pages/login/login.component';
import { MainComponent } from '@app/layout/main/main.component';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';
import { HeaderComponent } from '@app/layout/header/header.component';
import { SidenavComponent } from '@app/layout/sidenav/sidenav.component';
import { CategoriasComponent } from '@app/pages/categorias/categorias.component';
import { ModalComponent } from '@app/layout/modal/modal.component';

import { SidenavService } from '@app/_services/sidenav.service';
import { LoginService } from '@app/_services/login.service';
import { CategoriaService } from '@app/_services/categoria.service';
import { ModalService } from "@app/_services/modal.service";

import { AuthGuard } from '@app/_guards/auth.guard';
import { LoggedGuard } from '@app/_guards/logged.guard';
import { JwtInterceptor } from '@app/_interceptors/auth.jwt.interceptor';

import { AppConfig } from '@app/app.config';
import 'moment/locale/pt-br';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    CategoriasComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [
    SidenavService,
    LoginService,
    CategoriaService,
    ModalService,
    AuthGuard,
    LoggedGuard,
    AppConfig,
     {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
