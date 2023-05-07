import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendDialogComponent } from './friend-dialog.component';

describe('FriendDialogComponent', () => {
  let component: FriendDialogComponent;
  let fixture: ComponentFixture<FriendDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
