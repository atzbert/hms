/* eslint-disable require-jsdoc */

import {Uuid} from '../util/uuids';
import User from '../repository/domain/User';

class UserPreviewResponse {
  id: Uuid;
  lastName: string;
  firstName: string;
  imageUrl: string;

  constructor(
      id: Uuid,
      lastName: string,
      firstName: string,
      imageUrl: string,
  ) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.imageUrl = imageUrl;
  }

  static from = (user: User): UserPreviewResponse =>
    new UserPreviewResponse(
        user.id,
        user.lastName,
        user.firstName,
        user.imageUrl,
    );

  static fromArray(users: User[]): UserPreviewResponse[] {
    const previews: UserPreviewResponse[] = [];
    for (const user of users) {
      previews.push(UserPreviewResponse.from(user));
    }
    return previews;
  }
}

export default UserPreviewResponse;
