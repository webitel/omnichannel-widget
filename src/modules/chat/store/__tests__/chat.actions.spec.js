import deepequal from 'fast-deep-equal';
import getContextMock from '../../../../../tests/unit/mock/store/contextMock';
import MessageType from '../../enums/MessageType.enum';
import chat from '../chat';
import ChatAPI from '../../api/chat';

describe('chat module: actions', () => {
  let context;
  let messageClient;

  beforeEach(() => {
    messageClient = {
      addEventListener: () => {},
    };
    context = getContextMock(jest);
    context.state.messageClient = messageClient;
  });

  it('SUBSCRIBE_TO_MESSAGES attaches event listener to messageClient', () => {
    messageClient.addEventListener = jest.fn();
    chat.actions.SUBSCRIBE_TO_MESSAGES(context, { messageClient });
    expect(messageClient.addEventListener).toHaveBeenCalled();
  });

  it('SUBSCRIBE_TO_MESSAGES commits SET_MESSAGE_CLIENT with passed client', () => {
    chat.actions.SUBSCRIBE_TO_MESSAGES(context, { messageClient });
    expect(context.commit)
    .toHaveBeenCalledWith('SET_MESSAGE_CLIENT', messageClient);
  });

  it('SUBSCRIBE_TO_MESSAGES subscribes to MessageType.INIT', async () => {
    await chat.actions.SUBSCRIBE_TO_MESSAGES(context, { messageClient });
    expect(context.commit.mock.calls.some(([, params]) => deepequal(params.event, [MessageType.INIT])))
    .toBe(true);
  });

  it('SUBSCRIBE_TO_MESSAGES subscribes to MessageType.CLOSED', async () => {
    await chat.actions.SUBSCRIBE_TO_MESSAGES(context, { messageClient });
    expect(context.commit.mock.calls.some(([, params]) => deepequal(params.event, [MessageType.CLOSED])))
    .toBe(true);
  });

  it('OPEN_SESSION calls messageClient openSocket()', () => {
    messageClient.openSocket = jest.fn();
    chat.actions.OPEN_SESSION(context);
    expect(messageClient.openSocket).toHaveBeenCalled();
  });

  it('ON_SESSION_INFO_MESSAGE calls SET_USER mutation with passed user', () => {
    const user = { jest: 'fn' };
    const message = { user };
    chat.actions.ON_SESSION_INFO_MESSAGE(context, message);
    expect(context.commit).toHaveBeenCalledWith('SET_USER', user);
  });

  it('ON_SESSION_INFO_MESSAGE calls SET_MEDIA_MAX_SIZE mutation with passed value', () => {
    const mediaMaxSize = 1000 - 7;
    const message = { mediaMaxSize };
    chat.actions.ON_SESSION_INFO_MESSAGE(context, message);
    expect(context.commit)
    .toHaveBeenCalledWith('SET_MEDIA_MAX_SIZE', mediaMaxSize);
  });

  it('ON_SESSION_INFO_MESSAGE calls SET_MESSAGES mutation with passed msgs', () => {
    const msgs = [{ jest: 'foo' }];
    const message = { msgs };
    chat.actions.ON_SESSION_INFO_MESSAGE(context, message);
    expect(context.commit).toHaveBeenCalledWith('SET_MESSAGES', msgs);
  });

  it('ON_MESSAGE dispatches REPLACE_MESSAGE, if passed message has "seq"', async () => {
    const seq = 123;
    const message = { jest: 'jest' };
    const data = { data: { seq, message } };
    const output = { message, seq };
    context.state._listeners = {};
    await chat.actions.ON_MESSAGE(context, data);
    expect(context.dispatch).toHaveBeenCalledWith('REPLACE_MESSAGE', output);
    expect(context.dispatch).not.toHaveBeenCalledWith('ADD_MESSAGE', output);
  });

  it('ON_MESSAGE dispatches ADD_MESSAGE, if passed message has no "seq"', async () => {
    const message = { jest: 'jest' };
    const data = { data: { message } };
    const output = message;
    context.state._listeners = {};
    await chat.actions.ON_MESSAGE(context, data);
    expect(context.dispatch).toHaveBeenCalledWith('ADD_MESSAGE', output);
    expect(context.dispatch)
    .not
    .toHaveBeenCalledWith('REPLACE_MESSAGE', output);
  });

  it('REPLACE_MESSAGE commits REPLACE_MESSAGE_BY_SEQ with passed message and seq', () => {
    const payload = { message: { jest: 123 }, seq: 321 };
    chat.actions.REPLACE_MESSAGE(context, payload);
    expect(context.commit)
    .toHaveBeenCalledWith('REPLACE_MESSAGE_BY_SEQ', payload);
  });

  it('REMOVE_MESSAGE_BY_SEQ commits REMOVE_MESSAGE_BY_SEQ with passed seq', () => {
    const seq = 321;
    chat.actions.REMOVE_MESSAGE_BY_SEQ(context, seq);
    expect(context.commit).toHaveBeenCalledWith('REMOVE_MESSAGE_BY_SEQ', seq);
  });

  it('ADD_MESSAGE commits PUSH_MESSAGE with passed message', () => {
    const message = { jest: 'jest' };
    chat.actions.ADD_MESSAGE(context, message);
    expect(context.commit).toHaveBeenCalledWith('PUSH_MESSAGE', message);
  });

  it('SEND_MENU dispatches SEND_MESSAGE with properly formatted message', () => {
    const code = 'jest';
    const message = { message: { text: code, type: MessageType.TEXT } };
    chat.actions.SEND_MENU(context, { code });
    expect(context.dispatch).toHaveBeenCalledWith('SEND_MESSAGE', message);
  });

  it('SEND_DRAFT dispatches SEND_MESSAGE with properly formatted message', () => {
    const draft = 'jest';
    context.state.draft = draft;
    const message = { message: { text: draft, type: MessageType.TEXT } };
    chat.actions.SEND_DRAFT(context);
    expect(context.dispatch).toHaveBeenCalledWith('SEND_MESSAGE', message);
  });

  it('SEND_DRAFT trims spaces before SEND_MESSAGE dispatch', () => {
    const result = 'jest';
    context.state.draft = `  ${result}  `;
    const message = { message: { text: result, type: MessageType.TEXT } };
    chat.actions.SEND_DRAFT(context);
    expect(context.dispatch).toHaveBeenCalledWith('SEND_MESSAGE', message);
  });

  it('SEND_FILES commits INCREMENT_SEQ on each passed file', async () => {
    const files = [{}, {}];
    await chat.actions.SEND_FILES(context, files);
    expect(context.commit.mock.calls.filter(([mutation]) => mutation
      === 'INCREMENT_SEQ').length).toBe(2);
  });

  it('SEND_FILES throws error if file size is larger than mediaMaxSize', () => {
    context.state.mediaMaxSize = 10;
    const file = { size: 11 };
    chat.actions.SEND_FILES(context, [file]);
    expect(context.dispatch.mock.calls.findIndex(([, message]) => message.type === MessageType.ERROR))
    .not.toBe(-1);
  });

  it('SEND_FILES dispatches _GET_FILE_PREVIEW with passed file', () => {
    const file = { jest: 'jest' };
    const seq = 2;
    context.state.seq = seq;
    chat.actions.SEND_FILES(context, [file]);
    expect(context.dispatch).toHaveBeenCalledWith('_GET_FILE_PREVIEW', { file, seq });
  });

  // it.skip('SEND_FILES dispatches ADD_MESSAGE with mock, received from _GET_FILE_PREVIEW', async () => {
  //   const file = {};
  //   const message = { mock: 'jest', file };
  //   context.dispatch = jest.fn(([name]) => (name === '_GET_FILE_PREVIEW' ? message : {}));
  //   await chat.actions.SEND_FILES(context, [file]);
  //   expect(context.dispatch).toHaveBeenCalledWith('ADD_MESSAGE', message);
  // });

  it('SEND_FILES dispatches _UPLOAD_FILE', async () => {
    const file = {};
    await chat.actions.SEND_FILES(context, [file]);
    expect(context.dispatch.mock.calls.findIndex(([name]) => name === '_UPLOAD_FILE'))
    .not.toBe(-1);
  });

  it('_GET_FILE_PREVIEW generates message with correct field schema', () => {
    const file = {};
    const seq = 21;
    const user = { jest: '' };
    context.state.user = user;
    const message = chat.actions._GET_FILE_PREVIEW(context, { file, seq });
    const output = {
      type: MessageType.FILE,
      file: {
        uploadProgress: 0,
      },
      from: user,
      seq,
    };
    expect(message).toMatchObject(output);
  });

  it('_UPLOAD_FILE dispatches SEND_MESSAGE', async () => {
    context.rootState = { config: { wsUrl: 'jest' } };
    const fileLink = {};

    jest.spyOn(ChatAPI, 'sendFile').mockImplementationOnce(jest.fn(() => [fileLink]));

    const file = {};
    const messageMock = { file };
    const seq = 22;

    await chat.actions._UPLOAD_FILE(context, { file, seq, messageMock });
    const result = { message: { file: fileLink, type: MessageType.FILE }, seq };
    expect(context.dispatch).toHaveBeenCalledWith('SEND_MESSAGE', result);
  });

  it('SET_DRAFT commits SET_DRAFT with passed value', () => {
    const draft = 'jest';
    chat.actions.SET_DRAFT(context, draft);
    expect(context.commit).toHaveBeenCalledWith('SET_DRAFT', draft);
  });

  it('SET_CONNECTION_STATUS commits SET_CONNECTION_STATUS with passed value', () => {
    const status = true;
    chat.actions.SET_CONNECTION_STATUS(context, status);
    expect(context.commit).toHaveBeenCalledWith('SET_CONNECTION_STATUS', status);
  });

  it('LISTEN_ON_MESSAGE subscribes on all "regular" message types', () => {
    chat.actions.LISTEN_ON_MESSAGE(context, () => {});
    expect(context.commit.mock.calls.find(([, params]) => params.event)[1].event).toEqual([
      MessageType.TEXT,
      MessageType.FILE,
      MessageType.CONTACT,
      MessageType.JOINED,
      MessageType.LEFT,
      MessageType.CLOSED,
    ]);
  });
});
