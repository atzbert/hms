/* eslint-disable require-jsdoc */

import ParticipantPreviewResponse from './ParticipantPreviewResponse';
import {Uuid} from '../util/uuids';

export default class {
  participants: ParticipantPreviewResponse[];
  hackathonId: Uuid;

  constructor(
      participants: ParticipantPreviewResponse[],
      hackathonId: Uuid,
  ) {
    this.participants = participants;
    this.hackathonId = hackathonId;
  }
}
