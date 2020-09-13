import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FeedRssService } from './feed-rss.service';

describe('RssFeedsService', () => {
  let service: FeedRssService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(FeedRssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
