import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreGridComponent } from './grid.component';

describe('CoreGridComponent', () => {
  let component: CoreGridComponent;
  let fixture: ComponentFixture<CoreGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
