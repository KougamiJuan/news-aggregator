import { Component, OnInit } from '@angular/core';

/** Component showing the loading gif */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  /** Default constructor. */
  constructor() { }

  /** Initial execution method. */
  ngOnInit(): void {
  }

}
