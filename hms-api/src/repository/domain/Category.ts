/* eslint-disable require-jsdoc */

import Uuid, {uuid} from '../../util/Uuid';

/**
 * A Category is meant to group a number of Ideas for a Hackathon into a group
 *
 * Every Category will belong to 1 and only 1 Hackathon
 *
 * Every Category will have 0 or more Ideas
 */
class Category {
  /**
   * The ID of the category
   *
   * Generated upon creation
   */
  id: Uuid;

  /**
   * Title of the Category
   *
   * Must have text (cannot be empty)
   */
  title: string;

  /**
   * The description of the Category
   *
   * May be empty
   */
  description: string;

  /**
   * The ID of the Hackathon to which the Category belongs
   */
  hackathonId: Uuid;

  constructor(
      title: string,
      description: string,
      hackathonId: Uuid,
  );
  constructor(
      title: string,
      description: string,
      hackathonId: Uuid,
      id: Uuid,
  );

  constructor(
      title: string,
      description: string,
      hackathonId: Uuid,
      id: Uuid = uuid(),
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.hackathonId = hackathonId;
  }
}

export default Category;
