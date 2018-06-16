import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreLogComponent } from './core-log.component';

describe('CoreLogComponent', () => {
  let component: CoreLogComponent;
  let fixture: ComponentFixture<CoreLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
