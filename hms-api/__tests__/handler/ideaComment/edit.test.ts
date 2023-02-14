import * as ideaCommentServive from '../../../src/service/idea-comment-service';
import {edit} from '../../../src/handler/ideaComment/edit';
import Uuid, {uuid} from '../../../src/util/Uuid';
import ideaCommentEditRequest from '../../../src/rest/ideaComment/IdeaCommentEditRequest';
import ideaCommentEditResponse from '../../../src/rest/ideaComment/IdeaCommentEditResponse';
import NotFoundError from '../../../src/error/NotFoundError';

const mockEditIdeaComment = jest.fn();
jest
  .spyOn(ideaCommentServive, 'editIdeaComment')
  .mockImplementation(mockEditIdeaComment);

describe('Edit Idea Comment', () => {
  test('Happy Path', async () => {
    const text = 'New fancy text';
    const id = uuid();
    const callback = jest.fn();

    mockEditIdeaComment.mockImplementation(() => {});

    await edit(toEvent(id, text), null, callback);

    expect(mockEditIdeaComment).toHaveBeenCalledWith(id, text);
    expect(callback).toHaveBeenCalledWith(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'content-type': 'application/json',
      },
      body: JSON.stringify(new ideaCommentEditResponse(id)),
    });
  });

  test('Throws NotFoundError', async () => {
    const text = 'New fancy text';
    const id = uuid();
    const callback = jest.fn();

    const errorMessage = 'Where is it????';
    mockEditIdeaComment.mockImplementation(() => {
      throw new NotFoundError(errorMessage);
    });

    await edit(toEvent(id, text), null, callback);

    expect(mockEditIdeaComment).toHaveBeenCalledWith(id, text);
    expect(callback).toHaveBeenCalledWith(null, {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'content-type': 'application/json',
      },
      body: JSON.stringify({errorMessage: errorMessage}),
    });
  });

  test('Throws Error', async () => {
    const text = 'New fancy text';
    const id = uuid();
    const callback = jest.fn();

    const errorMessage = 'Something went wrong';
    mockEditIdeaComment.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await edit(toEvent(id, text), null, callback);

    expect(mockEditIdeaComment).toHaveBeenCalledWith(id, text);
    expect(callback).toHaveBeenCalledWith(null, {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'content-type': 'application/json',
      },
      body: JSON.stringify({errorMessage: errorMessage}),
    });
  });
});

const toEvent = (id: Uuid, text: string): object => ({
  body: JSON.stringify(new ideaCommentEditRequest(text)),
  pathParameters: {
    id: id,
  },
});
