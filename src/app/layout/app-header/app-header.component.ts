import { Component, OnInit } from '@angular/core';
import { AppSidenavService } from '../../layout/app-sidenav/app-sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  constructor(private sidenav: AppSidenavService) {

  }

 toggleActive = false;

 toggleRightSidenav() {
   this.toggleActive = !this.toggleActive;
   this.sidenav.toggle();

   console.log('Clicked');
 }

}
