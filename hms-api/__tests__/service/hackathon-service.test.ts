import {mockPutItem} from '../repository/dynamo-db-mock';
import {randomHackathon} from '../repository/domain/hackathon-maker';
import {
  createHackathon,
  editHackathon,
  getHackathonListResponse,
  getHackathonResponse,
  removeHackathon,
} from '../../src/service/hackathon-service';
import {uuid} from '../../src/util/Uuid';
import {randomCategory} from '../repository/domain/category-maker';
import HackathonResponse from '../../src/rest/HackathonResponse';
import {randomUser} from '../repository/domain/user-maker';
import {
  makeParticipant,
  ParticipantData,
  randomParticipant,
} from '../repository/domain/participant-maker';
import {randomIdea} from '../repository/domain/idea-maker';
import * as hackathonRepository
  from '../../src/repository/hackathon-repository';
import * as participantRepository
  from '../../src/repository/participant-repository';
import * as userRepository from '../../src/repository/user-repository';
import * as categoryRepository from '../../src/repository/category-repository';
import * as ideaRepository from '../../src/repository/idea-repository';
import ReferenceNotFoundError from '../../src/error/ReferenceNotFoundError';
import NotFoundError from '../../src/error/NotFoundError';
import HackathonListResponse from '../../src/rest/HackathonListResponse';
import HackathonDeleteResponse from '../../src/rest/HackathonDeleteResponse';
import InvalidStateError from '../../src/error/InvalidStateError';
import Hackathon from '../../src/repository/domain/Hackathon';

const mockPutHackathon = jest.fn();
jest.spyOn(hackathonRepository, 'putHackathon')
    .mockImplementation(mockPutHackathon);
const mockGetHackathon = jest.fn();
jest.spyOn(hackathonRepository, 'getHackathon')
    .mockImplementation(mockGetHackathon);
const mockListHackathons = jest.fn();
jest.spyOn(hackathonRepository, 'listHackathons')
    .mockImplementation(mockListHackathons);
const mockDeleteHackathon = jest.fn();
jest.spyOn(hackathonRepository, 'deleteHackathon')
    .mockImplementation(mockDeleteHackathon);

const mockListParticipants = jest.fn();
jest.spyOn(participantRepository, 'listParticipants')
    .mockImplementation(mockListParticipants);

const mockGetUsers = jest.fn();
jest.spyOn(userRepository, 'getUsers')
    .mockImplementation(mockGetUsers);

const mockListCategories = jest.fn();
jest.spyOn(categoryRepository, 'listCategories')
    .mockImplementation(mockListCategories);

const mockListIdeas = jest.fn();
jest.spyOn(ideaRepository, 'listIdeasForHackathon')
    .mockImplementation(mockListIdeas);

beforeAll(() => {
});

describe('Create Hackathon', () => {
  test('Happy Path', async () => {
    mockPutItem();

    const expected = randomHackathon();

    expect(await createHackathon(
        expected.title,
        expected.startDate,
        expected.endDate,
    )).toEqual(expect.objectContaining({
      title: expected.title,
      startDate: expected.startDate,
      endDate: expected.endDate,
    }));
    expect(mockPutHackathon).toHaveBeenCalledWith(expect.objectContaining({
      title: expected.title,
      startDate: expected.startDate,
      endDate: expected.endDate,
    }));
  });

  test('StartDate > EndDate', async () => {
    const expected = randomHackathon();

    await expect(createHackathon(
        expected.title,
        expected.endDate,
        expected.startDate))
        .rejects
        .toThrow(InvalidStateError);
    expect(mockPutHackathon).not.toHaveBeenCalled();
  });

  test('StartDate === EndDate', async () => {
    const expected = randomHackathon();

    await expect(createHackathon(
        expected.title,
        expected.startDate,
        expected.startDate))
        .rejects
        .toThrow(InvalidStateError);
    expect(mockPutHackathon).not.toHaveBeenCalled();
  });
});

describe('Edit Hackathon', () => {
  test('Happy Path', async () => {
    const oldHackathon = randomHackathon();
    const title = 'Worst Hackathon Ever';
    const startDate = new Date('2000-01-01');
    const endDate = new Date('2000-04-04');
    const expected = new Hackathon(
        title,
        startDate,
        endDate,
        oldHackathon.id,
        oldHackathon.creationDate);

    mockGetHackathon.mockResolvedValue(oldHackathon);

    await editHackathon(oldHackathon.id, title, startDate, endDate);

    expect(mockPutHackathon).toHaveBeenCalledWith(expected);
  });

  test('StartDate > EndDate', async () => {
    const expected = randomHackathon();

    await expect(editHackathon(
        expected.id,
        expected.title,
        expected.endDate,
        expected.startDate))
        .rejects
        .toThrow(InvalidStateError);
    expect(mockPutHackathon).not.toHaveBeenCalled();
    expect(mockGetHackathon).not.toHaveBeenCalled();
  });

  test('StartDate === EndDate', async () => {
    const expected = randomHackathon();

    await expect(editHackathon(
        expected.id,
        expected.title,
        expected.startDate,
        expected.startDate))
        .rejects
        .toThrow(InvalidStateError);
    expect(mockPutHackathon).not.toHaveBeenCalled();
    expect(mockGetHackathon).not.toHaveBeenCalled();
  });

  test('Hackathon is missing', async () => {
    const id = uuid();

    mockGetHackathon.mockImplementation(() => {
      throw new Error('Uh oh');
    });

    await expect(editHackathon(
        id,
        'Anything',
        new Date(),
        new Date(new Date().getTime() + 10000)))
        .rejects
        .toThrow(NotFoundError);
    expect(mockPutHackathon).not.toHaveBeenCalled();
    expect(mockGetHackathon).toHaveBeenCalledWith(id);
  });
});

describe('Get Hackathon Response', () => {
  test('Happy Path', async () => {
    const hackathon = randomHackathon();
    const user1 = randomUser();
    const participant1 = makeParticipant({userId: user1.id} as ParticipantData);
    const user2 = randomUser();
    const participant2 = makeParticipant({userId: user2.id} as ParticipantData);
    const category1 = randomCategory();
    const category2 = randomCategory();
    const idea1 = randomIdea();
    const idea2 = randomIdea();
    const idea3 = randomIdea();

    const expected = HackathonResponse.from(
        hackathon,
        [participant1, participant2],
        [user1, user2],
        [category1, category2],
        [idea1, idea2, idea3],
    );

    mockListParticipants.mockResolvedValue([participant1, participant2]);
    mockGetUsers.mockResolvedValue([user1, user2]);
    mockListCategories.mockResolvedValue([category1, category2]);
    mockListIdeas.mockResolvedValue([idea1, idea2, idea3]);
    mockGetHackathon.mockResolvedValue(hackathon);

    expect(await getHackathonResponse(hackathon.id)).toStrictEqual(expected);
    expect(mockListParticipants).toHaveBeenCalledWith(hackathon.id);
    expect(mockGetUsers).toHaveBeenCalledWith([user1.id, user2.id]);
    expect(mockListCategories).toHaveBeenCalledWith(hackathon.id);
    expect(mockListIdeas).toHaveBeenCalledWith(hackathon.id);
    expect(mockGetHackathon).toHaveBeenCalledWith(hackathon.id);
  });

  test('Missing Ideas', async () => {
    const id = uuid();
    const user1 = randomUser();
    const participant1 = makeParticipant({userId: user1.id} as ParticipantData);
    const user2 = randomUser();
    const participant2 = makeParticipant({userId: user2.id} as ParticipantData);

    mockListParticipants.mockResolvedValue([participant1, participant2]);
    mockGetUsers.mockResolvedValue([user1, user2]);
    mockListCategories.mockResolvedValue([randomCategory(), randomCategory()]);
    mockListIdeas.mockImplementation(() => {
      throw new NotFoundError('Missing the things');
    });

    await expect(getHackathonResponse(id))
        .rejects
        .toThrow(ReferenceNotFoundError);
    expect(mockListParticipants).toHaveBeenCalledWith(id);
    expect(mockGetUsers).toHaveBeenCalledWith([user1.id, user2.id]);
    expect(mockListCategories).toHaveBeenCalledWith(id);
    expect(mockListIdeas).toHaveBeenCalledWith(id);
    expect(mockGetHackathon).not.toHaveBeenCalled();
  });

  test('Missing Categories', async () => {
    const id = uuid();
    const user1 = randomUser();
    const participant1 = makeParticipant({userId: user1.id} as ParticipantData);
    const user2 = randomUser();
    const participant2 = makeParticipant({userId: user2.id} as ParticipantData);

    mockListParticipants.mockResolvedValue([participant1, participant2]);
    mockGetUsers.mockResolvedValue([user1, user2]);
    mockListCategories.mockImplementation(() => {
      throw new NotFoundError('Missing the things');
    });

    await expect(getHackathonResponse(id))
        .rejects
        .toThrow(ReferenceNotFoundError);
    expect(mockListParticipants).toHaveBeenCalledWith(id);
    expect(mockGetUsers).toHaveBeenCalledWith([user1.id, user2.id]);
    expect(mockListCategories).toHaveBeenCalledWith(id);
    expect(mockListIdeas).not.toHaveBeenCalled();
    expect(mockGetHackathon).not.toHaveBeenCalled();
  });

  test('Missing Users', async () => {
    const id = uuid();
    const participant1 = randomParticipant();
    const participant2 = randomParticipant();

    mockListParticipants.mockResolvedValue([participant1, participant2]);
    mockGetUsers.mockImplementation(() => {
      throw new NotFoundError('Missing the things');
    });

    await expect(getHackathonResponse(id))
        .rejects
        .toThrow(ReferenceNotFoundError);
    expect(mockListParticipants).toHaveBeenCalledWith(id);
    expect(mockGetUsers).toHaveBeenCalledWith([
      participant1.userId,
      participant2.userId,
    ]);
    expect(mockListCategories).not.toHaveBeenCalled();
    expect(mockListIdeas).not.toHaveBeenCalled();
    expect(mockGetHackathon).not.toHaveBeenCalled();
  });

  test('Missing Participants', async () => {
    const id = uuid();
    mockListParticipants.mockImplementation(() => {
      throw new NotFoundError('Missing the things');
    });

    await expect(getHackathonResponse(id))
        .rejects
        .toThrow(ReferenceNotFoundError);
    expect(mockListParticipants).toHaveBeenCalledWith(id);
    expect(mockGetUsers).not.toHaveBeenCalled();
    expect(mockListCategories).not.toHaveBeenCalled();
    expect(mockListIdeas).not.toHaveBeenCalled();
    expect(mockGetHackathon).not.toHaveBeenCalled();
  });
});

describe('Get Hackathon List Response', () => {
  test('Happy Path', async () => {
    const hackathon1 = randomHackathon();
    const hackathon2 = randomHackathon();
    const hackathon3 = randomHackathon();
    const expected = HackathonListResponse.from(
        [hackathon1, hackathon2, hackathon3],
    );

    mockListHackathons.mockResolvedValue([hackathon1, hackathon2, hackathon3]);

    expect(await getHackathonListResponse()).toStrictEqual(expected);
    expect(mockListHackathons).toHaveBeenCalled();
  });
});

describe('Delete Hackathon', () => {
  test('Happy Path', async () => {
    const id = uuid();
    expect(await removeHackathon(id))
        .toStrictEqual(new HackathonDeleteResponse(id));
    expect(mockDeleteHackathon).toHaveBeenCalledWith(id);
  });
});
