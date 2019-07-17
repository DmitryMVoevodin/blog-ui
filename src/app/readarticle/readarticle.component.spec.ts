import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadArticleComponent } from './readarticle.component';

describe('ReadarticleComponent', () => {
  let component: ReadArticleComponent;
  let fixture: ComponentFixture<ReadArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
