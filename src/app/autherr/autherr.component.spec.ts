import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutherrComponent } from './autherr.component';

describe('AutherrComponent', () => {
  let component: AutherrComponent;
  let fixture: ComponentFixture<AutherrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutherrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutherrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
