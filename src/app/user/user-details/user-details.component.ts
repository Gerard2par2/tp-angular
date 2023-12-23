import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  public homeIcon = faHouseUser;

  public constructor(
    private readonly router: Router
  ) { }

  public navigateToHome(): void {
    this.router.navigate(['users']);
  }
}
