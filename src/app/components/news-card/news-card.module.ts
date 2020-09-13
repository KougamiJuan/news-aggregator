import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomizePaginatorDirective } from 'src/app/utils/customize-paginator.directive';
import { NewsCardComponent } from './news-card.component';


@NgModule({
  declarations: [NewsCardComponent, CustomizePaginatorDirective],
  imports: [CommonModule, MatCardModule, MatRippleModule, MatPaginatorModule],
  exports: [NewsCardComponent]
})
export class NewsCardModule { }
