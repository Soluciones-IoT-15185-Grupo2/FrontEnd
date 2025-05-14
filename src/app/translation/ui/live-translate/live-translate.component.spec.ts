import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTranslateComponent } from './live-translate.component';

describe('LiveTranslateComponent', () => {
  let component: LiveTranslateComponent;
  let fixture: ComponentFixture<LiveTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveTranslateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
