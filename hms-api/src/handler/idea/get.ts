import { buildResponse } from "../../rest/responses";
import { getIdea } from "../../repository/idea-repository";
import { getUser } from "../../repository/user-repository";
import {
  getParticipant,
  getParticipants,
} from "../../repository/participant-repository";
import { getHackathon } from "../../repository/hackathon-repository";
import { getSkills } from "../../repository/skill-repository";
import { getCategory } from "../../repository/category-repository";
import { usersFor } from "../../service/user-service";
import { wrapHandler } from "../handler-wrapper";
import IdeaResponse from "../../rest/IdeaResponse";
import participantPreviewResponse from "../../rest/ParticipantPreviewResponse";
import ParticipantPreviewResponse from "../../rest/ParticipantPreviewResponse";
import HackathonPreviewResponse from "../../rest/HackathonPreviewResponse";
import SkillPreviewResponse from "../../rest/SkillPreviewResponse";
import CategoryPreviewResponse from "../../rest/CategoryPreviewResponse";

// eslint-disable-next-line require-jsdoc
export async function get(event, context, callback) {
  await wrapHandler(async () => {
    const idea = await getIdea(event.pathParameters.id);
    const owner = await getParticipant(idea.ownerId);
    const participants = await getParticipants(idea.participantIds);
    const users = await usersFor(participants);
    const responseBody = new IdeaResponse(
      idea.id,
      participantPreviewResponse.from(owner, await getUser(owner.userId)),
      HackathonPreviewResponse.from(await getHackathon(idea.hackathonId)),
      ParticipantPreviewResponse.fromArray(participants, users),
      idea.title,
      idea.description,
      idea.problem,
      idea.goal,
      SkillPreviewResponse.fromArray(await getSkills(idea.requiredSkills)),
      CategoryPreviewResponse.from(await getCategory(idea.categoryId)),
      idea.creationDate
    );

    callback(null, buildResponse(200, responseBody));
  }, callback);
}
