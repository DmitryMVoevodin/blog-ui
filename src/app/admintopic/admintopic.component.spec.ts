import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintopicComponent } from './admintopic.component';

describe('AdmintopicComponent', () => {
  let component: AdmintopicComponent;
  let fixture: ComponentFixture<AdmintopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
