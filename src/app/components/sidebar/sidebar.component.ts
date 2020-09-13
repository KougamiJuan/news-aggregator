import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FeedRssService } from 'src/app/services/feed-rss.service';
import { convertList } from 'src/app/utils/transform';

/** Component that represents the sidebar. */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /** List of feeds. */
  feeds: any[];
  /** List of items */
  items: any[];
  /** List of sources */
  sources: any[];
  /** Sidebar status default value. */
  panelOpenState = false;
  /** @ignore */
  @Output() news = new EventEmitter<any[]>();
  /** @ignore */
  @Output() isLoading = new EventEmitter<boolean>();

  /**
   * Variables for obtaining services
   * @param feedRssService Feed connection service.
   */
  constructor(private feedRssService: FeedRssService) { }

  /** Initial execution method. */
  async ngOnInit(): Promise<void> { await this.getChanels(); }

  /**
   * Method for obtaining all feeds and items from the feed service and emitting the
   * corresponding items
   */
  async getChanels(): Promise<void> {
    this.isLoading.emit(true);
    this.sources = await this.feedRssService.getFeeds();
    this.feeds = convertList(this.sources.map(chanel => chanel.info));
    this.items = this.sources.map(chanel => chanel.items);
    this.news.emit([].concat(...this.items));
    this.isLoading.emit(false);
  }

  /** Method to filter the items according to the category of each feed. */
  filterItems(): void {
    const newSources = [...this.sources];
    this.feeds.forEach(feed => {
      feed.categories.forEach((category: { completed: any; name: any; }) => {
        if (!category.completed) {
          const index = newSources.findIndex(source => (source.info.category || source.info.description) === category.name);
          newSources.splice(index, 1);
        }
      });
    });
    this.items = newSources.map(chanel => chanel.items);
    this.news.emit([].concat(...this.items));
  }

  /** Method to update all categories of each feed or not. */
  updateAllComplete(feed: any): void {
    feed.allComplete = feed.categories.every((check: any) => check.completed);
    this.filterItems();
  }

  /** Method to know the status of the "All" category. */
  someComplete(feed: any): boolean {
    if (feed.categories == null) { return false; }
    return feed.categories.filter((check: any) => check.completed).length > 0 && !feed.allComplete;
  }

  /** Method to update all categories of each feed to false or true. */
  setAll(completed: boolean, feed: any): void {
    feed.allComplete = completed;
    if (feed.categories == null) { return; }
    feed.categories.forEach((check: any) => check.completed = completed);
    this.filterItems();
  }

}
