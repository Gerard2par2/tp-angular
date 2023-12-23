import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserFilters } from '../models/user.model';
import { getMockUserList } from '../../utils/mock.utils'; 

@Injectable({
  providedIn: 'root'
})
/**
 * Service to handle all user related requests
 */
export class UserService {

  private readonly users: BehaviorSubject<User[]>;

  constructor() {
    this.users = new BehaviorSubject<User[]>(getMockUserList());
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
    users.push(user);
    this.users.next(users);
  }

  /**
   * Removes a user from the list
   * @param userId the id of the user to remove
   */
  public removeUser(userId: string): void {
    const users = this.users.getValue();
    this.users.next(users.filter(user => user.userId !== userId));
  }

  /**
   * Updates a user from the list
   * @param user the user to update
   */
  public updateUser(user: User): void {
    const users = this.users.getValue();
    const userIndex = users.findIndex(u => u.userId === user.userId);
    users[userIndex] = user;
    this.users.next(users);
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
