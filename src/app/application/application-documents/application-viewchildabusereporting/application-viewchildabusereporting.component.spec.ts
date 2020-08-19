import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationViewchildabusereportingComponent } from './application-viewchildabusereporting.component';

describe('ApplicationViewchildabusereportingComponent', () => {
  let component: ApplicationViewchildabusereportingComponent;
  let fixture: ComponentFixture<ApplicationViewchildabusereportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationViewchildabusereportingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationViewchildabusereportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
