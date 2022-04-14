/* eslint-disable require-jsdoc */

import {buildResponse} from '../../rest/responses';
import {createUser} from '../../service/user-service';
import {mapStringToRoles} from '../../repository/domain/Role';
import {wrapHandler} from '../handler-wrapper';
import UserCreateRequest from '../../rest/UserCreateRequest';
import UserCreateResponse from '../../rest/UserCreateResponse';

export async function create(event, context, callback) {
  await wrapHandler(async () => {
    const request: UserCreateRequest = JSON.parse(event.body);

    const user = await createUser(
        request.lastName,
        request.firstName,
        request.emailAddress,
        mapStringToRoles(request.roles),
        request.skills,
        request.imageUrl);

    callback(null, buildResponse(201, new UserCreateResponse(user.id)));
  }, callback);
}
