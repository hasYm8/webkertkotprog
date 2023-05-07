import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendChooserDialogComponent } from './friend-chooser-dialog.component';

describe('FriendChooserDialogComponent', () => {
  let component: FriendChooserDialogComponent;
  let fixture: ComponentFixture<FriendChooserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendChooserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendChooserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
