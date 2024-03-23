import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    SideMenuComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    NavbarComponent,
    SideMenuComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
