import {mockDate} from '../util/date-mock';
import {mockUuid} from '../util/uuids-mock';
import {
  createUser,
  extractUser,
  getUserResponse,
  removeUser,
  usersFor,
} from '../../src/service/user-service';
import {uuid} from '../../src/util/Uuid';
import {makeUser, randomUser, UserData} from '../repository/domain/user-maker';
import {
  makeParticipant,
  ParticipantData,
  randomParticipant,
} from '../repository/domain/participant-maker';
import ReferenceNotFoundError from '../../src/error/ReferenceNotFoundError';
import Role from '../../src/repository/domain/Role';

import * as skillRepository from '../../src/repository/skill-repository';
import * as userRepository from '../../src/repository/user-repository';
import {randomSkill} from '../repository/domain/skill-maker';
import NotFoundError from '../../src/error/NotFoundError';
import UserResponse from '../../src/rest/UserResponse';

const mockGetSkills = jest.fn();
jest.spyOn(skillRepository, 'getSkills')
    .mockImplementation(mockGetSkills);
const mockSkillExists = jest.fn();
jest.spyOn(skillRepository, 'skillExists')
    .mockImplementation(mockSkillExists);

const mockPutUser = jest.fn();
jest.spyOn(userRepository, 'putUser')
    .mockImplementation(mockPutUser);
const mockGetUser = jest.fn();
jest.spyOn(userRepository, 'getUser')
    .mockImplementation(mockGetUser);
const mockGetUsers = jest.fn();
jest.spyOn(userRepository, 'getUsers')
    .mockImplementation(mockGetUsers);
const mockDeleteUser = jest.fn();
jest.spyOn(userRepository, 'deleteUser')
    .mockImplementation(mockDeleteUser);

describe('Create Idea', () => {
  test('Missing Skill', async () => {
    mockSkillExists.mockResolvedValue(false);

    await expect(createUser(
        'lastName',
        'firstName',
        'em@il.com',
        [Role.Admin],
        [uuid()],
        'https://image.jpg/img.png'))
        .rejects
        .toThrow(ReferenceNotFoundError);

    expect(mockPutUser).not.toHaveBeenCalled();
  });

  test('Happy Path', async () => {
    mockDate();
    mockSkillExists.mockResolvedValue(true);

    const expected = randomUser();
    mockUuid(expected.id);

    expect(await createUser(
        expected.lastName,
        expected.firstName,
        expected.emailAddress,
        expected.roles,
        expected.skills,
        expected.imageUrl))
        .toStrictEqual(expected);

    expect(mockPutUser).toHaveBeenCalledWith(expected);
  });
});

describe('Get User Response', () => {
  test('Happy Path', async () => {
    const user = randomUser();
    const skill1 = randomSkill();
    const skill2 = randomSkill();
    const skill3 = randomSkill();

    const expected = UserResponse.from(user, [skill1, skill2, skill3]);

    mockGetUser.mockResolvedValue(user);
    mockGetSkills.mockResolvedValue([skill1, skill2, skill3]);

    expect(await getUserResponse(user.id))
        .toStrictEqual(expected);
    expect(mockGetUser).toHaveBeenCalledWith(user.id);
    expect(mockGetSkills).toHaveBeenCalledWith(user.skills);
  });

  test('Missing Skills', async () => {
    const user = randomUser();

    mockGetUser.mockResolvedValue(user);
    mockGetSkills.mockImplementation(() => {
      throw new NotFoundError('Not a chance');
    });

    await expect(getUserResponse(user.id))
        .rejects
        .toThrow(ReferenceNotFoundError);
    expect(mockGetUser).toHaveBeenCalledWith(user.id);
    expect(mockGetSkills).toHaveBeenCalledWith(user.skills);
  });

  test('Missing User', async () => {
    const id = uuid();

    mockGetUser.mockImplementation(() => {
      throw new NotFoundError('Not a chance');
    });

    await expect(getUserResponse(id))
        .rejects
        .toThrow(NotFoundError);
    expect(mockGetUser).toHaveBeenCalledWith(id);
    expect(mockGetSkills).not.toHaveBeenCalled();
  });
});

describe('Extract User For Participant', () => {
  test('When user not in list', () => {
    const participant = randomParticipant();

    expect(extractUser([], participant)).toBeUndefined();
  });

  test('When user in singleton list', () => {
    const user = makeUser({} as UserData);
    const participant = makeParticipant({userId: user.id} as ParticipantData);

    expect(extractUser([user], participant)).toStrictEqual(user);
  });

  test('When user in list', () => {
    const user = makeUser({} as UserData);
    const participant = makeParticipant({userId: user.id} as ParticipantData);

    expect(extractUser(
        [randomUser(), user, randomUser()],
        participant,
    )).toStrictEqual(user);
  });
});

describe('Users For', () => {
  test('Happy path', async () => {
    const userId1 = uuid();
    const participant1 = makeParticipant({userId: userId1} as ParticipantData);
    const user1 = makeUser({id: userId1} as UserData);

    const userId2 = uuid();
    const participant2 = makeParticipant({userId: userId2} as ParticipantData);
    const user2 = makeUser({id: userId2} as UserData);

    const userId3 = uuid();
    const participant3 = makeParticipant({userId: userId3} as ParticipantData);
    const user3 = makeUser({id: userId3} as UserData);

    mockGetUsers.mockResolvedValue([user1, user2, user3]);

    const users = await usersFor([participant1, participant2, participant3]);

    expect(mockGetUsers).toHaveBeenCalledWith([userId1, userId2, userId3]);
    expect(users).toStrictEqual([user1, user2, user3]);
  });
});

describe('Delete User', () => {
  test('Happy Path', async () => {
    const id = uuid();
    await removeUser(id);
    expect(mockDeleteUser).toHaveBeenCalledWith(id);
  });
});
