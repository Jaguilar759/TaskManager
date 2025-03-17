import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTasksComponent } from './action-tasks.component';

describe('ActionTasksComponent', () => {
  let component: ActionTasksComponent;
  let fixture: ComponentFixture<ActionTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
