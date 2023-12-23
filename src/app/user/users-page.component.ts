import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  public readonly users: BehaviorSubject<User[]>;

  public constructor(
    private readonly userService: UserService,
    public readonly router: Router) {
    this.users = this.userService.getUsers();
  }

  public onAddButtonClick(): void {
    this.router.navigate(['add']);
  }



}
