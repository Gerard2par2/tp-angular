import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/shared/services/user.service';
import { User, UserFilters } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.scss']
})
export class UserListTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  @Input() public users!: BehaviorSubject<User[]>;
  private readonly destroyed$ = new Subject<void>();

  public filterValues: UserFilters = {
    email: '',
    firstName: '',
    lastName: '',
    bio: '',
    occupation: '',
  };

  public currentFilter: keyof UserFilters = 'email';

  public readonly columns: string[] = ['name', 'email', 'occupation', 'bio', 'birthDate', 'actions'];
  dataSource = new MatTableDataSource<User>();
  totalUsers = 0;
  pageSize = 10;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: User, property: string) => {
      switch (property) {
        case 'birthDate': return item.birthDate.toMillis();
        default: return item[property as keyof User] as string;
      }
    };
    this.users.pipe(takeUntil(this.destroyed$)).subscribe(users => {
      this.dataSource.data = users;
      this.totalUsers = users.length;
    });
  } 

  changePage(event: any): void {
    this.pageSize = event.pageSize;
  }

  applyFilter(event: Event, filterName: keyof UserFilters): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValues[filterName] = filterValue;
    this.dataSource.filter = filterValue && JSON.stringify(this.filterValues);
  }

  onSelectedDisplayChange(event: string): void {
    this.currentFilter = event as keyof UserFilters;
  }

  
  public detailsButtonClicked(event: User) {
    this.router.navigate(['/user/'+event.userId, event]);
  }

  public editButtonClicked(event: User) {
    this.router.navigate(['/update/'+event.userId, event]);
  }

  public deleteButtonClicked(event: User) {
    this.userService.removeUser(event.userId);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

