import {mockDate} from '../util/date-mock';
import {mockUuid} from '../util/uuids-mock';

import {
  createParticipant,
  getParticipantResponse,
  removeParticipant,
} from '../../src/service/participant-service';
import {uuid} from '../../src/util/Uuid';
import ReferenceNotFoundError from '../../src/error/ReferenceNotFoundError';
import {
  makeParticipant,
  ParticipantData,
  randomParticipant,
} from '../repository/domain/participant-maker';

import * as participantRepository
  from '../../src/repository/participant-repository';
import * as hackathonRepository
  from '../../src/repository/hackathon-repository';
import * as userRepository from '../../src/repository/user-repository';
import ParticipantResponse from '../../src/rest/ParticipantResponse';
import {randomUser} from '../repository/domain/user-maker';
import {randomHackathon} from '../repository/domain/hackathon-maker';
import NotFoundError from '../../src/error/NotFoundError';

const mockPutParticipant = jest.fn();
jest.spyOn(participantRepository, 'putParticipant')
    .mockImplementation(mockPutParticipant);
const mockGetParticipant = jest.fn();
jest.spyOn(participantRepository, 'getParticipant')
    .mockImplementation(mockGetParticipant);
const mockDeleteParticipant = jest.fn();
jest.spyOn(participantRepository, 'deleteParticipant')
    .mockImplementation(mockDeleteParticipant);

const mockGetHackathon = jest.fn();
jest.spyOn(hackathonRepository, 'getHackathon')
    .mockImplementation(mockGetHackathon);
const mockHackathonExists = jest.fn();
jest.spyOn(hackathonRepository, 'hackathonExists')
    .mockImplementation(mockHackathonExists);

const mockGetUser = jest.fn();
jest.spyOn(userRepository, 'getUser')
    .mockImplementation(mockGetUser);
const mockUserExists = jest.fn();
jest.spyOn(userRepository, 'userExists')
    .mockImplementation(mockUserExists);

describe('Create Participant', () => {
  test('Missing Hackathon', async () => {
    mockHackathonExists.mockResolvedValue(false);
    mockUserExists.mockResolvedValue(true);

    await expect(createParticipant(uuid(), uuid()))
        .rejects
        .toThrow(ReferenceNotFoundError);

    expect(mockPutParticipant).not.toHaveBeenCalled();
  });

  test('Missing User', async () => {
    mockHackathonExists.mockResolvedValue(true);
    mockUserExists.mockResolvedValue(false);

    await expect(createParticipant(uuid(), uuid()))
        .rejects
        .toThrow(ReferenceNotFoundError);

    expect(mockPutParticipant).not.toHaveBeenCalled();
  });

  test('Happy Path', async () => {
    mockDate();

    mockHackathonExists.mockResolvedValue(true);
    mockUserExists.mockResolvedValue(true);

    const expected = randomParticipant();
    mockUuid(expected.id);

    expect(await createParticipant(expected.userId, expected.hackathonId))
        .toStrictEqual(expected);

    expect(mockPutParticipant).toHaveBeenCalledWith(expected);
  });
});

describe('Get Participant Response', () => {
  test('Happy Path', async () => {
    const user = randomUser();
    const participant = makeParticipant({userId: user.id} as ParticipantData);
    const hackathon = randomHackathon();

    const expected = ParticipantResponse.from(participant, user, hackathon);

    mockGetParticipant.mockResolvedValue(participant);
    mockGetUser.mockResolvedValue(user);
    mockGetHackathon.mockResolvedValue(hackathon);

    expect(await getParticipantResponse(participant.id))
        .toStrictEqual(expected);
    expect(mockGetParticipant).toHaveBeenCalledWith(participant.id);
    expect(mockGetUser).toHaveBeenCalledWith(participant.userId);
    expect(mockGetHackathon).toHaveBeenCalledWith(participant.hackathonId);
  });

  test('Missing Hackathon', async () => {
    const user = randomUser();
    const participant = makeParticipant({userId: user.id} as ParticipantData);

    mockGetParticipant.mockResolvedValue(participant);
    mockGetUser.mockResolvedValue(user);
    mockGetHackathon.mockImplementation(() => {
      throw new NotFoundError('IT IS MISSING');
    });

    await expect(getParticipantResponse(participant.id))
        .rejects
        .toThrow(ReferenceNotFoundError);
    expect(mockGetParticipant).toHaveBeenCalledWith(participant.id);
    expect(mockGetUser).toHaveBeenCalledWith(participant.userId);
    expect(mockGetHackathon).toHaveBeenCalledWith(participant.hackathonId);
  });

  test('Missing User', async () => {
    const participant = randomParticipant();

    mockGetParticipant.mockResolvedValue(participant);
    mockGetUser.mockImplementation(() => {
      throw new NotFoundError('IT IS MISSING');
    });

    await expect(getParticipantResponse(participant.id))
        .rejects
        .toThrow(ReferenceNotFoundError);
    expect(mockGetParticipant).toHaveBeenCalledWith(participant.id);
    expect(mockGetUser).toHaveBeenCalledWith(participant.userId);
    expect(mockGetHackathon).not.toHaveBeenCalled();
  });

  test('Missing Participant', async () => {
    const id = uuid();

    mockGetParticipant.mockImplementation(() => {
      throw new NotFoundError('IT IS MISSING');
    });

    await expect(getParticipantResponse(id))
        .rejects
        .toThrow(NotFoundError);
    expect(mockGetParticipant).toHaveBeenCalledWith(id);
    expect(mockGetUser).not.toHaveBeenCalled();
    expect(mockGetHackathon).not.toHaveBeenCalled();
  });
});

describe('Delete Participant', () => {
  test('Happy Path', async () => {
    const id = uuid();
    await removeParticipant(id);
    expect(mockDeleteParticipant).toHaveBeenCalledWith(id);
  });
});

