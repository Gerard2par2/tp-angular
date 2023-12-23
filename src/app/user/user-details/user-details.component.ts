import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  public homeIcon = faHouseUser;

  public user!: User;

  public constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    public readonly activatedRoute: ActivatedRoute
  ) { 
    const userId = this.activatedRoute.snapshot.params['id'];
    this.user = this.userService.getUser(userId);
  }

  public navigateToHome(): void {
    this.router.navigate(['users']);
  }

  public editButtonClicked(event: User) {
    this.router.navigate(['update/'+event.userId, event]);
  }

  public deleteButtonClicked(event: User) {
    this.userService.removeUser(event.userId);
    this.navigateToHome();
  }
}
