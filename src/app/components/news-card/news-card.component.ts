import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';

/** Component representing the news cards */
@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit, OnChanges {
  /** Default value of the total number of cards displayed per page */
  pageSize = 12;
  /** @ignore */
  @Input() news: any[];
  /** @ignore */
  @Input() orderDate: boolean;

  /** Default constructor. */
  constructor() { registerLocaleData(localeEsCo, 'es-CO'); }

  /** Initial execution method. */
  ngOnInit(): void {
  }

  /** Method invoked immediately after default change listener. */
  ngOnChanges(): void { this.dateOrdering(); }

  /** Method to sort dates in ascending or descending order. */
  dateOrdering(): void {
    if (!!this.news && this.news.length > 0) {
      if (!this.orderDate) {
        this.news.sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate));
      } else {
        this.news.sort((a, b) => Date.parse(a.pubDate) - Date.parse(b.pubDate));
      }
    }
  }

  /** Method to open a new browser tab with the url of the news. */
  goToLink(url: string): void { window.open(url); }

}
