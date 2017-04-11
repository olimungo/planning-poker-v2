import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingPigsListComponent } from './voting-pigs-list.component';

describe('VotingPigsListComponent', () => {
  let component: VotingPigsListComponent;
  let fixture: ComponentFixture<VotingPigsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingPigsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingPigsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
