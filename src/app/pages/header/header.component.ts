import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FriendDialogComponent } from "../home/friend-dialog/friend-dialog.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = false;
  public toolbarBgColor = "#fbfbfd";
  public toolbarTextColor = "black";

  constructor(
    public auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
        this.toolbarBgColor = "rgba(128, 128, 128, 0.3)";
        this.toolbarTextColor = "white";
      } else {
        this.isLoggedIn = false;
        //this.toolbarBgColor = "#fbfbfd"; 
        //TODO backdrop-filter-hez hasonlo eredmenyt kene elerni
        this.toolbarBgColor = "rgba(251, 251, 253, 0.8)"
        this.toolbarTextColor = "black"
      }
    });
  }

  signOut() {
    this.auth.signOut().subscribe({
      next: () => this.router.navigate(['login'])
    });
  }

  open_friend_controller() {
    const dialogRef = this.dialog.open(FriendDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_user_settings() {
  
  }

}
