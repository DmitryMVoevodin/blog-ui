import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingtopicComponent } from './addingtopic.component';

describe('AddingtopicComponent', () => {
  let component: AddingtopicComponent;
  let fixture: ComponentFixture<AddingtopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingtopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
