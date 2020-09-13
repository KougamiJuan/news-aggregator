import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

/** Component that represents the header of the page. */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /** Determine if the date has been clicked or not */
  isClicked: boolean;
  /** Determine if the menu has been clicked or not */
  isClickedMenu: boolean;
  /** @ignore */
  @Input() sidebar: MatSidenav;
  /** @ignore */
  @Output() dateOrder = new EventEmitter<boolean>();

  /** Default constructor. */
  constructor() { this.isClicked = this.isClickedMenu = false; }

  /** Initial execution method. */
  ngOnInit(): void {
  }

  /** Method to know what the status of the date is (Ascending or descending order) */
  clickDate(): void {
    this.isClicked = this.isClicked ? false : true;
    this.dateOrder.emit(this.isClicked);
  }

  /**
   * Method to know what the status of the menu is (to turn the icon to one side or
   * the other)
   */
  clickMenu(): void {
    this.isClickedMenu = this.isClickedMenu ? false : true;
  }

}
