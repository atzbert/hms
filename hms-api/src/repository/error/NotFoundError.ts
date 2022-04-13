/* eslint-disable require-jsdoc */

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
