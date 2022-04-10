import {buildResponse} from '../../rest/responses';
import {createHackathon} from '../../repository/hackathon-repository';
import Hackathon from '../../repository/domain/Hackathon';
import HackathonCreateRequest from '../../rest/HackathonCreateRequest';
import HackathonCreateResponse from '../../rest/HackathonCreateResponse';

// eslint-disable-next-line require-jsdoc
export async function create(event, context, callback) {
  const request: HackathonCreateRequest = JSON.parse(event.body);

  const hackathon = new Hackathon(
      request.title,
      request.startDate,
      request.endDate,
  );
  await createHackathon(hackathon);

  callback(null, buildResponse(201, new HackathonCreateResponse(hackathon.id)));
}
