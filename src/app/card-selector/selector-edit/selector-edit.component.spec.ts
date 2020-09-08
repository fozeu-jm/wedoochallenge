import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorEditComponent } from './selector-edit.component';

describe('SelectorEditComponent', () => {
  let component: SelectorEditComponent;
  let fixture: ComponentFixture<SelectorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
