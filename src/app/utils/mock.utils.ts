import { DateTime } from "luxon";
import { User } from "../shared/models/user.model";

export function getMockUserList(): User[] {
    const mockUserList = [
        {
          userId: generateRandomUserId(),
          firstName: 'Jean-Phil',
          lastName: 'MonSlip',
          email: 'jean-phil-monslip@falzardmail.com',
          occupation: 'Dresseur de pigeon',
          bio: 'Fan de country, de slip et de dressage de pigeon',
          birthDate: DateTime.fromISO('1995-01-01'),
        }, {
            userId: generateRandomUserId(),
            firstName: 'Jean-Pierre',
            lastName: 'Pernault',
            email: 'jpp-aled@uwu.com',
            occupation: 'Journaliste',
            bio: 'Légende de TF1, BG eternel, fan de la fête du cochon de Sainte-Maure-de-Touraine',
            birthDate: DateTime.fromISO('1950-01-01'),
        }, {
            userId: generateRandomUserId(),
            firstName: 'Jean-Claude',
            lastName: 'Van Damme',
            email: 'jadoreleaudans20-30ansyenauraplus@karate.com',
            occupation: 'Acteur',
            bio: 'Jean-Claude Van Damme, maitre de karate mais aussi coeur sensible tu vois ?',
            birthDate: DateTime.fromISO('1960-01-01'),
        }, {
            userId: generateRandomUserId(),
            firstName: 'Mock',
            lastName: 'Tard',
            email: 'mock-tard@vannenule.prout',
            occupation: 'Homme d\'affaire',
            bio: 'Mock Tard, multi-milionaire, fan de Van-Damme et hater de Jean-Phil. Pernault est ok.',
            birthDate: DateTime.fromISO('1972-01-01'),
        }, {
            userId: generateRandomUserId(),
            firstName: 'Simon',
            lastName: 'Menard',
            email: 'simard-menon-progamer@bg.uwu',
            occupation: 'Enorme BG',
            bio: 'C\'est moi wesh',
            birthDate: DateTime.fromISO('2002-10-03'),
        }
    ];
    for(let i = 0; i < 100; i++) {
        mockUserList.push({
            userId: generateRandomUserId(),
            firstName: 'Test ' + i.toString(),
            lastName: 'Test ' + i.toString(),
            email: 'test@mock.test' ,
            occupation: 'Test ' + i.toString(),
            bio: 'Test ' + i.toString(),
            birthDate: DateTime.fromISO('2000-01-01'),
        });
    }

    return mockUserList;
}

function generateRandomUserId(length: number = 25): string {
        let userId = '';
        for(let i = 0; i < length; i++) {
            userId += Math.floor(Math.random() * 10);
        }
        return userId;
}
