import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingarticleComponent } from './addingarticle.component';

describe('AddingarticleComponent', () => {
  let component: AddingarticleComponent;
  let fixture: ComponentFixture<AddingarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
