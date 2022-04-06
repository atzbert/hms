import {Uuid} from '../uuids';

// eslint-disable-next-line require-jsdoc
export class HackathonCreateRequest {
  title: string;
  startDate: Date;
  endDate: Date;
}

// eslint-disable-next-line require-jsdoc
export class HackathonCreateResponse {
  id: Uuid;
  title: string;
  startDate: Date;
  endDate: Date;
  creationDate: Date;

  // eslint-disable-next-line require-jsdoc
  constructor(
      id: Uuid,
      title: string,
      startDate: Date,
      endDate: Date,
      creationDate: Date,
  ) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.creationDate = creationDate;
  }
}

// eslint-disable-next-line require-jsdoc
export class HackathonListResponse {
  ids: Uuid[];

  // eslint-disable-next-line require-jsdoc
  constructor(ids: Uuid[]) {
    this.ids = ids;
  }
}

// eslint-disable-next-line require-jsdoc
export class HackathonResponse {
  id: Uuid;
  title: string;
  startDate: Date;
  endDate: Date;
  creationDate: Date;
  // Just going to set all of these as Uuids for right now
  participantIds: Uuid[];
  categoryIds: Uuid[];
  ideaIds: Uuid[];

  // eslint-disable-next-line require-jsdoc
  constructor(
      id: Uuid,
      title: string,
      startDate: Date,
      endDate: Date,
      participantIds: Uuid[],
      categoryIds: Uuid[],
      ideaIds: Uuid[],
  ) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.participantIds = participantIds;
    this.categoryIds = categoryIds;
    this.ideaIds = ideaIds;
  }
}

// eslint-disable-next-line require-jsdoc
export class HackathonDeleteResponse {
  id: Uuid;

  // eslint-disable-next-line require-jsdoc
  constructor(id: Uuid) {
    this.id = id;
  }
}
