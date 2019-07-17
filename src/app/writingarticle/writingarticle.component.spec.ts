import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingarticleComponent } from './writingarticle.component';

describe('WritingarticleComponent', () => {
  let component: WritingarticleComponent;
  let fixture: ComponentFixture<WritingarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritingarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
