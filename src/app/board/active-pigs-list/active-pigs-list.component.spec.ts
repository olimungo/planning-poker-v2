import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePigsListComponent } from './active-pigs-list.component';

describe('ActivePigsListComponent', () => {
  let component: ActivePigsListComponent;
  let fixture: ComponentFixture<ActivePigsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePigsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePigsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
