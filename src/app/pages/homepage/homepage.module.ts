import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderModule } from 'src/app/components/header/header.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { NewsCardModule } from 'src/app/components/news-card/news-card.module';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    HeaderModule,
    SidebarModule,
    NewsCardModule,
    MatSidenavModule,
    LoadingModule
  ]
})
export class HomepageModule { }
