/* eslint-disable require-jsdoc */

import {
  getParticipant,
  getParticipants,
} from '../repository/participant-repository';
import {
  getHackathon,
  hackathonExists,
} from '../repository/hackathon-repository';
import {categoryExists, getCategory} from '../repository/category-repository';
import {getSkills, skillExists} from '../repository/skill-repository';
import {
  addParticipantToIdea,
  addVoterToIdea,
  deleteIdea,
  deleteParticipantFromIdea,
  deleteVoterFromIdea,
  getIdea,
  listIdeasAll,
  listIdeasForCategory,
  listIdeasForHackathon,
  listIdeasForOwner,
  listIdeasForParticipant,
  putIdea,
} from '../repository/idea-repository';
import {usersFor} from './user-service';
import {getUser} from '../repository/user-repository';
import Uuid from '../util/Uuid';
import Idea from '../repository/domain/Idea';
import ReferenceNotFoundError from '../error/ReferenceNotFoundError';
import IdeaResponse from '../rest/idea/IdeaResponse';
import IdeaListResponse from '../rest/idea/IdeaListResponse';
import IdeaDeleteResponse from '../rest/idea/IdeaDeleteResponse';
import DeletionError from '../error/DeletionError';
import NotFoundError from '../error/NotFoundError';
import InvalidStateError from '../error/InvalidStateError';
import ValidationError from '../error/ValidationError';
import IdeaListAllResponse from '../rest/idea/IdeaListAllResponse';

export async function createIdea(
  ownerId: Uuid,
  hackathonId: Uuid,
  title: string,
  description: string,
  problem: string,
  goal: string,
  requiredSkills: Uuid[],
  categoryId: Uuid,
): Promise<Idea> {
  if (!(await hackathonExists(hackathonId))) {
    throw new ReferenceNotFoundError(
      'Cannot create Idea, ' +
        `Hackathon with id: ${hackathonId} does not exist`,
    );
  } else if (!(await categoryExists(categoryId, hackathonId))) {
    throw new ReferenceNotFoundError(
      'Cannot create Idea, ' +
        `Category with id: ${categoryId} does not exist ` +
        `in Hackathon with id: ${hackathonId}`,
    );
  }

  for (const skillId of requiredSkills) {
    if (!(await skillExists(skillId))) {
      throw new ReferenceNotFoundError(
        `Cannot create Idea, Skill with id: ${skillId} does not exist`,
      );
    }
  }

  const idea = new Idea(
    ownerId,
    hackathonId,
    title,
    description,
    problem,
    goal,
    requiredSkills,
    categoryId,
  );
  const result = idea.validate();
  if (result.hasFailed()) {
    throw new ValidationError('Cannot create Idea', result);
  }

  await putIdea(idea);
  return idea;
}

export async function editIdea(
  id: Uuid,
  hackathonId: Uuid,
  title: string,
  description: string,
  problem: string,
  goal: string,
  requiredSkills: Uuid[],
  categoryId: Uuid,
): Promise<void> {
  let existing: Idea;
  try {
    existing = await getIdea(id);
  } catch (e) {
    throw new NotFoundError(
      `Cannot edit Idea with id: ${id}, it does not exist`,
    );
  }

  if (!(await categoryExists(categoryId, hackathonId))) {
    throw new ReferenceNotFoundError(
      `Cannot edit Idea with id: ${id}, ` +
        `Category with id: ${categoryId} does not exist ` +
        `in Hackathon with id: ${hackathonId}`,
    );
  }

  for (const skillId of requiredSkills) {
    if (!(await skillExists(skillId))) {
      throw new ReferenceNotFoundError(
        `Cannot edit Idea with id: ${id}, ` +
          `Skill with id: ${skillId} does not exist`,
      );
    }
  }

  existing.hackathonId = hackathonId;
  existing.title = title;
  existing.description = description;
  existing.problem = problem;
  existing.goal = goal;
  existing.requiredSkills = requiredSkills;
  existing.categoryId = categoryId;

  const result = existing.validate();
  if (result.hasFailed()) {
    throw new ValidationError(`Cannot edit Idea with id ${id}`, result);
  }

  await putIdea(existing);
}

export async function getIdeaResponse(id: Uuid): Promise<IdeaResponse> {
  const idea = await getIdea(id);

  let ownerUser;
  try {
    ownerUser = await getUser(idea.ownerId);
  } catch (e) {
    throw new ReferenceNotFoundError(
      `Cannot get Idea with id: ${id}, ` +
        `unable to get owner User with id: ${idea.ownerId} `,
    );
  }

  let participants;
  try {
    participants = await getParticipants(idea.participantIds);
  } catch (e) {
    throw new ReferenceNotFoundError(
      `Cannot get Idea with id: ${id}, ` +
        `unable to get Participants with ids: ${idea.participantIds}`,
    );
  }

  let voters;
  try {
    voters = await getParticipants(idea.voterIds);
  } catch (e) {
    throw new ReferenceNotFoundError(
      `Cannot get Idea with id: ${id}, ` +
        `unable to get Voters with ids: ${idea.voterIds}`,
    );
  }

  let participantUsers;
  try {
    participantUsers = await usersFor(participants);
  } catch (e) {
    throw new ReferenceNotFoundError(
      `Cannot get Idea with id: ${id}, ` +
        'unable to get Users for Participants with ids: ' +
        `${idea.participantIds}`,
    );
  }

  let voterUsers;
  try {
    voterUsers = await usersFor(voters);
  } catch (e) {
    throw new ReferenceNotFoundError(
      `Cannot get Idea with id: ${id}, ` +
        'unable to get Users for Voters with ids: ' +
        `${idea.voterIds}`,
    );
  }

  let hackathon;
  try {
    hackathon = await getHackathon(idea.hackathonId);
  } catch (e) {
    throw new ReferenceNotFoundError(
      `Cannot get Idea with id: ${id}, ` +
        `unable to get Hackathon with id: ${idea.hackathonId}`,
    );
  }

  let skills;
  try {
    skills = await getSkills(idea.requiredSkills);
  } catch (e) {
    throw new ReferenceNotFoundError(
      `Cannot get Idea with id: ${id}, ` +
        `unable to get Skills with ids: ${idea.requiredSkills}`,
    );
  }

  let category;
  try {
    category = await getCategory(idea.categoryId);
  } catch (e) {
    throw new ReferenceNotFoundError(
      `Cannot get Idea with id: ${id}, ` +
        `unable to get Category with id: ${idea.categoryId}`,
    );
  }

  return IdeaResponse.from(
    idea,
    ownerUser,
    hackathon,
    participants,
    voters,
    participantUsers,
    voterUsers,
    skills,
    category,
  );
}

export async function getAllIdeasResponse(): Promise<IdeaListAllResponse> {
  const ideas = await listIdeasAll();

  return IdeaListAllResponse.from(ideas);
}

export async function getIdeasForHackathonListResponse(
  hackathonId: Uuid,
): Promise<IdeaListResponse> {
  if (!(await hackathonExists(hackathonId))) {
    throw new NotFoundError(
      `Cannot list Ideas for Hackathon with id: ${hackathonId}, ` +
        'it does not exist',
    );
  }

  const ideas = await listIdeasForHackathon(hackathonId);

  return IdeaListResponse.from(ideas, hackathonId);
}

export async function removeParticipant(
  ideaId: Uuid,
  participantId: Uuid,
): Promise<void> {
  await deleteParticipantFromIdea(ideaId, participantId);
}

export async function addParticipant(
  ideaId: Uuid,
  participantId: Uuid,
): Promise<void> {
  let idea;
  try {
    idea = await getIdea(ideaId);
  } catch (e) {
    throw new NotFoundError(
      `Cannot add Participant with id: ${participantId} ` +
        `to Idea with id ${ideaId}, ` +
        'Idea does not exist',
    );
  }

  let participant;
  try {
    participant = await getParticipant(participantId);
  } catch (e) {
    throw new NotFoundError(
      `Cannot add Participant with id: ${participantId} ` +
        `to Idea with id ${ideaId}, Participant does not exist`,
    );
  }

  if (idea.hackathonId !== participant.hackathonId) {
    throw new InvalidStateError(
      `Cannot add Participant with id: ${participantId} ` +
        `to Idea with id ${ideaId}, ` +
        'they are in different Hackathons',
    );
  }

  await addParticipantToIdea(ideaId, participantId);
}

export async function removeVoter(
  ideaId: Uuid,
  participantId: Uuid,
): Promise<void> {
  await deleteVoterFromIdea(ideaId, participantId);
}

export async function addVoter(
  ideaId: Uuid,
  participantId: Uuid,
): Promise<void> {
  let idea;
  try {
    idea = await getIdea(ideaId);
  } catch (e) {
    throw new NotFoundError(
      `Cannot add Voter with id: ${participantId} ` +
        `to Idea with id ${ideaId}, ` +
        'Idea does not exist',
    );
  }

  let participant;
  try {
    participant = await getParticipant(participantId);
  } catch (e) {
    throw new NotFoundError(
      `Cannot add Voter with id: ${participantId} ` +
        `to Idea with id ${ideaId}, Participant does not exist`,
    );
  }

  if (idea.hackathonId !== participant.hackathonId) {
    throw new InvalidStateError(
      `Cannot add Voter with id: ${participantId} ` +
        `to Idea with id ${ideaId}, ` +
        'they are in different Hackathons',
    );
  }

  await addVoterToIdea(ideaId, participantId);
}

export async function removeIdea(id: Uuid): Promise<IdeaDeleteResponse> {
  await deleteIdea(id);
  return new IdeaDeleteResponse(id);
}

// TODO this could be done using a Batch operation
export async function removeIdeasForCategory(categoryId: Uuid): Promise<void> {
  const ideas = await listIdeasForCategory(categoryId);
  for (const idea of ideas) {
    try {
      await deleteIdea(idea.id);
    } catch (e) {
      throw new DeletionError(
        'Unable to delete all Ideas for Category with ' +
          `id: ${categoryId}, Idea with id: ${idea.id} failed to delete`,
      );
    }
  }
}

// TODO this could be done using a Batch operation
export async function removeIdeasForOwner(ownerId: Uuid): Promise<void> {
  const ideas = await listIdeasForOwner(ownerId);
  for (const idea of ideas) {
    try {
      await deleteIdea(idea.id);
    } catch (e) {
      throw new DeletionError(
        'Unable to delete all Ideas for Owner with ' +
          `id: ${ownerId}, Idea with id: ${idea.id} failed to delete`,
      );
    }
  }
}

// TODO this could be done using a Batch operation
export async function removeIdeasForHackathon(
  hackathonId: Uuid,
): Promise<void> {
  const ideas = await listIdeasForHackathon(hackathonId);
  for (const idea of ideas) {
    try {
      await deleteIdea(idea.id);
    } catch (e) {
      throw new DeletionError(
        'Unable to delete all Ideas for Hackathon with ' +
          `id: ${hackathonId}, Idea with id: ${idea.id} failed to delete`,
      );
    }
  }
}

export async function removeParticipantFromIdeas(
  participantId: Uuid,
): Promise<void> {
  const ideas = await listIdeasForParticipant(participantId);
  for (const idea of ideas) {
    try {
      await deleteParticipantFromIdea(idea.id, participantId);
    } catch (e) {
      throw new DeletionError(
        'Unable to delete Participant from all Ideas, ' +
          `Participant with id: ${participantId} failed to be deleted from ` +
          `Idea with id: ${idea.id}`,
      );
    }
  }
}
