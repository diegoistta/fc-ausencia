import { Component, ViewChild } from '@angular/core';
import { AppSidenavService } from './app-sidenav.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './app-sidenav.component.html',
  styleUrls: ['./app-sidenav.component.css']
})
export class AppSidenavComponent {

  @ViewChild('sidenav') public sidenav: MatSidenav;
  folders = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      link: ['/dashboar']
    },
    {
      name: 'Categorias',
      icon: 'assignment',
      link: ['/categorias']
      
    },
    {
      name: 'Tipos de Afastamento',
      icon: 'insert_invitation',
      link: ['/tiposafastamento']
    }
  ];

  constructor(private sidenavService: AppSidenavService) {	}

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
