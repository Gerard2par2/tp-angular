import { Pipe, PipeTransform } from '@angular/core';
import { USER_FILTERS_LABELS, UserFilters } from '../models/user.model';

@Pipe({
  name: 'userListFilterLabel'
})
export class UserListFilterLabelPipe implements PipeTransform {

  transform(value: string): string {
    return USER_FILTERS_LABELS[value as keyof UserFilters];
  }

}
