import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../shared/models/user.model";
import { DateTime } from "luxon";

const formatDateToInput = (date: DateTime): string => date.toFormat('yyyy-MM-dd');

export const formatDateFromInput = (date: string): DateTime => DateTime.fromFormat(date, 'yyyy-MM-dd');

export const buildEditUserForm = (user: User): FormGroup => {
    return new FormGroup({
        firstName: new FormControl<string>(user.firstName, [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl<string>(user.lastName, [Validators.required, Validators.minLength(2)]),
        email: new FormControl<string>(user.email, [Validators.required, Validators.email]),
        occupation: new FormControl<string>(user.occupation, [Validators.required, Validators.minLength(3)]),
        bio: new FormControl<string>(user.bio, [Validators.required, Validators.minLength(3)]),
        birthDate: new FormControl<string>(formatDateToInput(user.birthDate), [Validators.required]),
    });         
}

export const buildAddUserForm = (): FormGroup => {
    return buildEditUserForm({
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        occupation: '',
        bio: '',
        birthDate: DateTime.now().minus({years: 18}),
    })
}