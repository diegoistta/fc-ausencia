import { Component, OnInit } from '@angular/core';
import { SidenavService } from '@app/_services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private sidenav: SidenavService) {

  }

 toggleActive = false;

 toggleRightSidenav() {
   this.toggleActive = !this.toggleActive;
   this.sidenav.toggle();

   console.log('Clicked');
 }

}
