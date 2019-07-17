import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlechangingpanelComponent } from './articlechangingpanel.component';

describe('ArticlechangingpanelComponent', () => {
  let component: ArticlechangingpanelComponent;
  let fixture: ComponentFixture<ArticlechangingpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlechangingpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlechangingpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
