import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { xmlToJson } from 'src/app/utils/transform';
import { TOPICS, PROXY_URL } from 'src/app/utils/constants';

/** Feed connection service. */
@Injectable({
  providedIn: 'root'
})
export class FeedRssService {

  /** Performs HTTP requests */
  constructor(private http: HttpClient) { }

  /**
   * Function to get all xml feeds.
   * @returns Feed structure.
   */
  async getFeeds(): Promise<any[]> {
    const feedRss = [];
    await Promise.all(TOPICS.map(async topic => {
      const response = await this.http.get(PROXY_URL + topic, { responseType: 'text' }).toPromise();
      feedRss.push(xmlToJson(response));
    }));
    return feedRss;
  }

}
