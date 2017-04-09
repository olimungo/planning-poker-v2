import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDeckComponent } from './cards-deck.component';

describe('VoteComponent', () => {
  let component: CardsDeckComponent;
  let fixture: ComponentFixture<CardsDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
