import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogeComponentComponent } from './dialoge-component.component';

describe('DialogeComponentComponent', () => {
  let component: DialogeComponentComponent;
  let fixture: ComponentFixture<DialogeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
