import { DateTime } from 'luxon';

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    occupation: string;
    bio: string;
    birthDate: DateTime;
}

export interface UserFilters {
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
    occupation: string;
}

export const USER_FILTERS_LABELS: UserFilters = {
    email: 'Email',
    firstName: 'Prénom',
    lastName: 'Nom',
    bio: 'Bio',
    occupation: 'Occupation',
}
