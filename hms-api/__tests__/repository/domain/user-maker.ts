import {uuid, Uuid} from '../../../src/util/uuids';
import {Role} from '../../../src/repository/domain/Role';
import User from '../../../src/repository/domain/User';

export interface UserData {
  id: Uuid;
  lastName: string;
  firstName: string;
  emailAddress: string;
  roles: Role[];
  skills: Uuid[];
  imageUrl: string;
  creationDate: Date;
}

export const makeUser = (
    {
      id = uuid(),
      lastName = 'Gruber',
      firstName = 'Hans',
      emailAddress = 'test@hms.api',
      roles = [Role.Participant],
      skills = [],
      imageUrl = 'https://hms.api/image.jpg',
      creationDate = new Date(),
    }: UserData): User => new User(
    lastName,
    firstName,
    emailAddress,
    roles,
    skills,
    imageUrl,
    id,
    creationDate,
);

export const randomUser = () => makeUser({} as UserData);
