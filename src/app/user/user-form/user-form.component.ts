import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFormModes } from 'src/app/shared/enums/user-form-modes.enum';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { buildAddUserForm, buildEditUserForm, formatDateFromInput } from 'src/app/utils/form.utils';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  private readonly formMode: UserFormModes;
  public buttonText: string = '';

  public userFormGroup;
  public homeIcon = faHouseUser;

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly router: Router)
  {
    this.formMode = this.activatedRoute.snapshot.data['mode'];
    console.log(this.formMode);
    this.userFormGroup = this.buildFormGroup();
    this.buttonText = this.formMode === UserFormModes.EDIT ? "Modifier" : "Ajouter";
  }

  private buildFormGroup(): FormGroup {
    switch(this.formMode) {
      case (UserFormModes.EDIT):
        const userId = this.activatedRoute.snapshot.params['id'];
        return buildEditUserForm(this.userService.getUser(userId));
      case (UserFormModes.ADD):
        return buildAddUserForm();
      default:
        throw new Error('Invalid mode passed as data during routing to UserFormComponent');
    }
  }

  public onSubmit(): void {
    if(!this.userFormGroup.valid) {
      return;
    }
    
    const user: User = {
      ...this.userFormGroup.value, 
      userId: this.activatedRoute.snapshot.params['id'] || '', 
      birthDate: formatDateFromInput(this.userFormGroup.value.birthDate)
    };

    switch(this.formMode) {
      case (UserFormModes.EDIT):
        this.userService.updateUser(user);
        break;
      case (UserFormModes.ADD):
        this.userService.addUser(user);
        break;
      default:
          throw new Error('Invalid mode passed as data during routing to UserFormComponent');
    }
    this.router.navigate(['']);
  }

  public navigateToHome(): void {
    this.router.navigate(['']);
  }
}
