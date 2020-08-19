import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipPersonnelprofileContainerComponent } from './ownership-personnelprofile-container.component';

describe('OwnershipPersonnelprofileContainerComponent', () => {
  let component: OwnershipPersonnelprofileContainerComponent;
  let fixture: ComponentFixture<OwnershipPersonnelprofileContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnershipPersonnelprofileContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnershipPersonnelprofileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
