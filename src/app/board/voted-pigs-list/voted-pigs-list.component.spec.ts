import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotedPigsListComponent } from './voted-pigs-list.component';

describe('VotedPigsListComponent', () => {
  let component: VotedPigsListComponent;
  let fixture: ComponentFixture<VotedPigsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotedPigsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotedPigsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
