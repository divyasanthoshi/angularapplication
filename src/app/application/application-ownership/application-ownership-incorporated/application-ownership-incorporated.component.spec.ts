import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationOwnershipIncorporatedComponent } from './application-ownership-incorporated.component';

describe('ApplicationOwnershipIncorporatedComponent', () => {
  let component: ApplicationOwnershipIncorporatedComponent;
  let fixture: ComponentFixture<ApplicationOwnershipIncorporatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationOwnershipIncorporatedComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationOwnershipIncorporatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
