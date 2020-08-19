import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysmessageComponent } from './sysmessage.component';

describe('SysmessageComponent', () => {
  let component: SysmessageComponent;
  let fixture: ComponentFixture<SysmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysmessageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
