import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User, UserDto, UserFilters } from '../models/user.model';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { UserMappingService } from './user-mapping.service';
import { AppContextService } from './app-context.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to handle all user related requests
 */
export class UserService {

  private readonly users: BehaviorSubject<User[]>;
  private readonly apiURL;

  constructor(
    private readonly http: HttpClient,
    private readonly userMapper: UserMappingService,
    private readonly appContextService: AppContextService) {
    this.users = new BehaviorSubject<User[]>([]);
    this.apiURL = environment.apiUrl;

    this.fetchUsers().subscribe(users => {
      this.users.next(users);
    });
  }

  /**
   * Fetches the list of users from the API
   * @returns the list of users from the API
   */
  private fetchUsers(): Observable<User[]> {
    this.appContextService.isLoading.next(true);
    return this.http.get<UserDto[]>(this.apiURL).pipe(
      map((userDto: UserDto[]) => this.userMapper.fromUserDtoListToUserList(userDto)),
      map((users: User[]) => {
        this.appContextService.isLoading.next(false)
        return users;
    }));
  }

  /**
   * Posts a user to the API
   * @param user the user to post
   * @returns the posted user
   */
  private postUser(user: User): Observable<User> {
    this.appContextService.isLoading.next(true);
    return this.http.post<UserDto>(this.apiURL, this.userMapper.fromUserToUserDto(user)).pipe(map((userDto: UserDto) => this.userMapper.fromUserDtoToUser(userDto)),
    map((user: User) => {
      this.appContextService.isLoading.next(false)
      return user;
    }));
  }

  /**
   * Puts a user to the API
   * @param user the user to put
   * @returns the put user
   */
  private putUser(user: User): Observable<User> {
    this.appContextService.isLoading.next(true);
    return this.http.put<UserDto>(`${this.apiURL}/${user.userId}`, this.userMapper.fromUserToUserDto(user)).pipe(map((userDto: UserDto) => this.userMapper.fromUserDtoToUser(userDto)),
    map((user: User) => {
      this.appContextService.isLoading.next(false)
      return user;
    }));
  }

  /**
   * Deletes a user from the API
   * @param userId the id of the user to delete
   * @returns the deleted user
   */
  private deleteUser(userId: string): Observable<User> {
    this.appContextService.isLoading.next(true);
    return this.http.delete<UserDto>(`${this.apiURL}/${userId}`).pipe(map((userDto: UserDto) => this.userMapper.fromUserDtoToUser(userDto)),
    map((user: User) => {
      this.appContextService.isLoading.next(false)
      return user;
    }));
  }

  /**
   * Returns the list of users
   */
  public getUsers(): BehaviorSubject<User[]> {
    return this.users;
  }
  
  /**
   * Returns a user from the list
   * @param userId the id of the user to get
   */
  public getUser(userId: string): User {
    const users = this.users.getValue();
    const user = users.find(user => user.userId === userId);
    if(user === undefined) {
      throw new Error(`User with id ${userId} not found`);
    } 
    return user;
  }

  /**
   * Adds a user to the list
   * @param user the user to add
   */
  public addUser(user: User): void {
    const users = this.users.getValue();
    this.postUser(user).subscribe(user => {
      users.push(user);
      this.users.next(users);
    });
  }

  /**
   * Removes a user from the list
   * @param userId the id of the user to remove
   */
  public removeUser(userId: string): void {
    const users = this.users.getValue();
    this.deleteUser(userId).subscribe(user => {
      const userIndex = users.findIndex(u => u.userId === userId);
      users.splice(userIndex, 1);
      this.users.next(users);
    });
  }

  /**
   * Updates a user from the list
   * @param user the user to update
   */
  public updateUser(user: User): void {
    const users = this.users.getValue();
    const userId = user.userId;
    this.putUser(user).subscribe(user => {
      const userIndex = users.findIndex(u => u.userId === userId);
      users[userIndex] = user;
      this.users.next(this.users.getValue());
    });
  }

  /**
   * Creates a filter predicate for filtering users based on given filter values.
   * @param data the user to filter
   * @param filter the filter values
   */
  public get filterPredicate(): (data: User, filter: string) => boolean {
    return (data: User, filter: string): boolean => {
      const searchTerms: UserFilters = JSON.parse(filter);

      // Check if data properties match the search terms. 
      // If a search term is empty, it is ignored in the filter.
      return (searchTerms.firstName ? data.firstName.toLowerCase().includes(searchTerms.firstName.toLowerCase()) : true) &&
             (searchTerms.lastName ? data.lastName.toLowerCase().includes(searchTerms.lastName.toLowerCase()) : true) &&
             (searchTerms.email ? data.email.toLowerCase().includes(searchTerms.email.toLowerCase()) : true) &&
             (searchTerms.bio ? data.bio.toLowerCase().includes(searchTerms.bio.toLowerCase()) : true) &&
             (searchTerms.occupation ? data.occupation.toLowerCase().includes(searchTerms.occupation.toLowerCase()) : true);
    };
  }

}
