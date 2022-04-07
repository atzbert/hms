'use strict';

import {hackathonIds} from '../../mock/hackathon';
import {buildResponse} from '../../rest/responses';

// eslint-disable-next-line require-jsdoc
export function list(event, context, callback) {
  const response = buildResponse(200, hackathonIds);

  callback(null, response);
}
