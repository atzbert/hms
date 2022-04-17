/* eslint-disable require-jsdoc */

import {
  deleteHackathon,
  getHackathon,
  putHackathon,
} from '../repository/hackathon-repository';
import {listParticipants} from '../repository/participant-repository';
import {usersFor} from './user-service';
import {listCategories} from '../repository/category-repository';
import {listIdeas} from '../repository/idea-repository';
import Uuid from '../util/Uuid';
import Hackathon from '../repository/domain/Hackathon';
import ParticipantPreviewResponse from '../rest/ParticipantPreviewResponse';
import HackathonResponse from '../rest/HackathonResponse';
import CategoryPreviewResponse from '../rest/CategoryPreviewResponse';
import IdeaPreviewResponse from '../rest/IdeaPreviewResponse';
import ReferenceNotFoundError from '../error/ReferenceNotFoundError';

export async function createHackathon(
    title: string,
    startDate: Date,
    endDate: Date,
): Promise<Hackathon> {
  const hackathon = new Hackathon(title, startDate, endDate);

  await putHackathon(hackathon);

  return hackathon;
}

export async function getHackathonResponse(
    id: Uuid,
): Promise<HackathonResponse> {
  let participants;
  try {
    participants = await listParticipants(id);
  } catch (e) {
    throw new ReferenceNotFoundError(`Cannot get Hackathon with id: ${id}, ` +
        `unable to list Participants`);
  }

  let users;
  try {
    users = await usersFor(participants);
  } catch (e) {
    throw new ReferenceNotFoundError(`Cannot get Hackathon with id: ${id}, ` +
        `unable to find Users for Participants ` +
        `${participants.map((p) => p.id)}`);
  }

  let categories;
  try {
    categories = await listCategories(id);
  } catch (e) {
    throw new ReferenceNotFoundError(`Cannot get Hackathon with id: ${id}, ` +
        `unable to list Categories`);
  }

  let ideas;
  try {
    ideas = await listIdeas(id);
  } catch (e) {
    throw new ReferenceNotFoundError(`Cannot get Hackathon with id: ${id}, ` +
        `unable to list Ideas`);
  }

  const hackathon = await getHackathon(id);
  return new HackathonResponse(
      hackathon.id,
      hackathon.title,
      hackathon.startDate,
      hackathon.endDate,
      ParticipantPreviewResponse.fromArray(participants, users),
      CategoryPreviewResponse.fromArray(categories),
      IdeaPreviewResponse.fromArray(ideas),
  );
}

export async function removeHackathon(id: Uuid) {
  await deleteHackathon(id);
}
