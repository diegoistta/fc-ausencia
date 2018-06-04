import { Component, ViewChild } from '@angular/core';
import { SidenavService } from '@app/_services/sidenav.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

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
    // {
    //   name: 'Tipos de Afastamento',
    //   icon: 'insert_invitation',
    //   link: ['/tiposafastamento']
    // }
  ];

  constructor(private sidenavService: SidenavService) {	}

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
