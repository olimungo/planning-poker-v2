import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitEndOfVotesComponent } from './wait-end-of-votes.component';

describe('WaitEndOfVotesComponent', () => {
  let component: WaitEndOfVotesComponent;
  let fixture: ComponentFixture<WaitEndOfVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitEndOfVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitEndOfVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
