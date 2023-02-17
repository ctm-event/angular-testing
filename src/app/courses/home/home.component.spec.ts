import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CoursesService } from '../services/courses.service';
import { HttpClient } from '@angular/common/http';
import { COURSES } from '../../../../server/db-data';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '../common/test-utils';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginerCourses = setupCourses().filter(
    (course) => course.category == 'BEGINNER'
  );

  const advancedCourses = setupCourses().filter(
    (course) => course.category == 'ADVANCED'
  );

  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
      'findAllCourses'
    ]);
    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [
        {
          provide: CoursesService,
          useValue: coursesServiceSpy
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService);
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display only beginner courses', () => {
    coursesService.findAllCourses.and.returnValue(of(beginerCourses));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mdc-tab.mat-mdc-tab'));
    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
  });

  it('should display only advanced courses', () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();
    const tab = el.query(By.css('.mdc-tab.mat-mdc-tab')),
      tabContent = el.query(By.css('.mdc-tab__content > .mdc-tab__text-label'));
    expect(tabContent.nativeElement.innerText).toBe(
      'Advanced',
      'Expected tab not found'
    );
  });

  it('should display both tabs', () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mdc-tab.mat-mdc-tab'));
    expect(tabs.length).toBe(2);
  });

  it('should display advanced courses when tab clicked', (done: DoneFn) => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mdc-tab.mat-mdc-tab'));
    expect(tabs.length).toBe(2);

    click(tabs[1]);
    fixture.detectChanges();

    setTimeout(() => {
      const titles = el.queryAll(By.css('mat-card-title'));
      expect(titles.length).toBeGreaterThan(0);
      expect(titles[0].nativeElement.textContent).toContain(
        advancedCourses[0].titles.description
      );
    }, 500);
    
    done();
  });
});
