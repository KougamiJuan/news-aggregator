import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderModule } from 'src/app/components/header/header.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { NewsCardModule } from 'src/app/components/news-card/news-card.module';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations/';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      imports: [
        HeaderModule,
        SidebarModule,
        NewsCardModule,
        MatSidenavModule,
        LoadingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
