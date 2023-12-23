import { Injectable } from "@angular/core";
import { DateTime } from "luxon";
import { User, UserDto } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
/**
 * Service to handle all user related mappings
 */
export class UserMappingService {

    public constructor() {}

    /**
     * Maps a user dto to a user
     * @param userDto the user dto to map
     * @returns the mapped user 
     */
    public fromUserDtoToUser(userDto: UserDto): User {
        return {
            userId: userDto.userId,
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            email: userDto.email,
            occupation: userDto.occupation,
            bio: userDto.bio,
            birthDate: DateTime.fromISO(userDto.birthDate),
        }
    }

    /**
     * Maps a list of user dto to a list of users
     * @param userDtoList the list of user dto to map
     * @returns the mapped list of users
     */
    public fromUserDtoListToUserList(userDtoList: UserDto[]): User[] {
        return userDtoList.map(userDto => this.fromUserDtoToUser(userDto));
    }

    /**
     * Maps a user to a user dto
     * @param user the user to map
     * @returns the mapped user dto
     */
    public fromUserToUserDto(user: User): UserDto {
        return {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            occupation: user.occupation,
            bio: user.bio,
            birthDate: user.birthDate.toISO() as string,
        }
    }

    /**
     * Maps a list of users to a list of user dto
     * @param userList the list of users to map
     * @returns the mapped list of user dto
     */
    public fromUserListToUserDtoList(userList: User[]): UserDto[] {
        return userList.map(user => this.fromUserToUserDto(user));
    }
}
