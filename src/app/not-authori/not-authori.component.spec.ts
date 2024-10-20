import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthoriComponent } from './not-authori.component';

describe('NotAuthoriComponent', () => {
  let component: NotAuthoriComponent;
  let fixture: ComponentFixture<NotAuthoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotAuthoriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotAuthoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
