import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationOwnershipUnincorporatedComponent } from './application-ownership-unincorporated.component';

describe('ApplicationOwnershipUnincorporatedComponent', () => {
  let component: ApplicationOwnershipUnincorporatedComponent;
  let fixture: ComponentFixture<ApplicationOwnershipUnincorporatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationOwnershipUnincorporatedComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationOwnershipUnincorporatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
