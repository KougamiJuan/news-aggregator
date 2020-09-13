import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar.component';


@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MatExpansionModule, MatCheckboxModule, FormsModule, MatIconModule],
  exports: [SidebarComponent]
})
export class SidebarModule { }
