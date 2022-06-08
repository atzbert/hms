/* eslint-disable require-jsdoc */

import Uuid, {uuid} from '../../util/Uuid';

/**
 * A Skill is any technical, personal, or other kind of skill that a User has
 * and may be desired for the completion of an Idea
 *
 * Every Skill is had by 0 or more Users
 */
class Skill {
  /**
   * The ID of the Skill
   *
   * Generated upon creation
   */
  id: Uuid;

  /**
   * The name of the Skill
   *
   * Must have text (cannot be empty)
   */
  name: string;

  /**
   * The description of the Skill
   *
   * May be empty
   */
  description: string;

  constructor(
      name: string,
      description: string,
  );
  constructor(
      name: string,
      description: string,
      id: Uuid,
  );

  constructor(
      name: string,
      description: string,
      id: Uuid = uuid(),
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

export default Skill;
