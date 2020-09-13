import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

/**
 * Component that represents the union of several components to form the main
 * page
 */
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  /** List of items transformed as news. */
  news: any[];
  /** News order by ascending or descending date. */
  order: boolean;
  /** To show or not the loading gif. */
  isLoading: boolean;

  /**
   * Variables to add meta descriptions to the component
   * @param meta A service for managing HTML meta tags.
   */
  constructor(private meta: Meta) { }

  /** Initial execution method. */
  ngOnInit(): void {
    this.isLoading = false;
    this.meta.updateTag({ name: 'description', content: 'Homepage. Show all the news in small cards and you can filter by category and sort by date' });
    this.meta.updateTag({ name: 'keywords', content: 'news, latest news, last minute, newspapers, breaking news' });
  }

  /**
   * Method to assign the transformed items to the news list.
   * @param items Transformed items representing news.
   */
  collectItems(items: any[]): void { this.news = items; }

  /**
   * Method that assigns the ascending or descending Boolean value to sort the news by dates.
   * @param dateOrder Ascending or descending value.
   */
  transmitDateOrder(dateOrder: boolean): void { this.order = dateOrder; }

}
