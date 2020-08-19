import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsOfficeuseonlyComponent } from './documents-officeuseonly.component';

describe('DocumentsOfficeuseonlyComponent', () => {
  let component: DocumentsOfficeuseonlyComponent;
  let fixture: ComponentFixture<DocumentsOfficeuseonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsOfficeuseonlyComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsOfficeuseonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
