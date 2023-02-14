import deepequal from 'fast-deep-equal';
import getContextMock from '../../../../../tests/unit/mock/store/contextMock';
import ChatAPI from '../../api/chat';
import Message from '../../classes/Message.class';
import MessageType from '../../enums/MessageType.enum';
import chat from '../chat';

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

  it('ON_SESSION_INFO_MESSAGE calls SET_MESSAGES mutation with passed msgs', async () => {
    const msgs = [{ jest: 'foo' }];
    const message = { msgs };
    await chat.actions.ON_SESSION_INFO_MESSAGE(context, message);
    const index = context.commit.mock.calls
    .findIndex(([commit]) => commit === 'SET_MESSAGES');
    expect(context.commit.mock.calls[index][1][0]).toBeInstanceOf(Message);
  });

  it('ON_MESSAGE dispatches REPLACE_MESSAGE, if passed message has "seq"', async () => {
    const seq = 123;
    const message = { jest: 'jest' };
    const data = { seq, message };
    context.state._listeners = {};
    await chat.actions.ON_MESSAGE(context, data);
    const index = context.dispatch.mock.calls
    .findIndex(([dispatch]) => dispatch === 'REPLACE_MESSAGE');
    expect(index).not.toBe(-1);
    expect(context.dispatch).not.toHaveBeenCalledWith('ADD_MESSAGE');
  });

  it('ON_MESSAGE dispatches ADD_MESSAGE, if passed message has no "seq"', async () => {
    const message = { jest: 'jest' };
    const data = { message };
    const output = new Message(message);
    context.state._listeners = {};
    await chat.actions.ON_MESSAGE(context, data);
    expect(context.dispatch).toHaveBeenCalledWith('ADD_MESSAGE', output);
    expect(context.dispatch)
    .not
    .toHaveBeenCalledWith('REPLACE_MESSAGE', output);
  });

  it('ON_MESSAGE dispatches TRIGGER_LISTENERS with its message', async () => {
    const message = { jest: 'jest' };
    const data = { message };
    await chat.actions.ON_MESSAGE(context, data);
    const index = context.dispatch.mock.calls
    .findIndex(([action]) => action === 'TRIGGER_LISTENERS');
    expect(context.dispatch.mock.calls[index][1]).toBeInstanceOf(Message);
  });

  it('ON_WEBSOCKET_ERROR dispatches ADD_MESSAGE', async () => {
    const error = { data: 'jest' };
    // const message = new Message({ type: MessageType.ERROR, error: { text: 'jest' } });
    await chat.actions.ON_WEBSOCKET_ERROR(context, error);
    const index = context.dispatch.mock.calls
    .findIndex(([action]) => action === 'ADD_MESSAGE');
    expect(context.dispatch.mock.calls[index][1]).toBeInstanceOf(Message);
  });

  // no need in INFO subscription for now
  it.skip('ON_WEBSOCKET_INFO dispatches ADD_MESSAGE with CLOSED MessageType, if error code is 1006', async () => {
    const info = { data: { code: 1006 } };
    // const message = new Message({ type: MessageType.CLOSED });
    await chat.actions.ON_WEBSOCKET_INFO(context, info);
    const index = context.dispatch.mock.calls
    .findIndex(([action]) => action === 'ADD_MESSAGE');
    expect(context.dispatch.mock.calls[index][1]).toBeInstanceOf(Message);
  });

  it('ON_WEBSOCKET_MESSAGE dispatches ON_SESSION_INFO_MESSAGE if no message and type were passed', async () => {
    const msg = { data: { code: 1006 } };
    // const message = new Message({ type: MessageType.CLOSED });
    await chat.actions.ON_WEBSOCKET_MESSAGE(context, msg);
    expect(context.dispatch.mock.calls[0][0]).toBe('ON_SESSION_INFO_MESSAGE');
  });

  it('ON_WEBSOCKET_MESSAGE dispatches ON_SESSION_INFO_MESSAGE if message and type were passed', async () => {
    const msg = { data: { type: 'jest', message: {} } };
    // const message = new Message({ type: MessageType.CLOSED });
    await chat.actions.ON_WEBSOCKET_MESSAGE(context, msg);
    expect(context.dispatch.mock.calls[0][0]).toBe('ON_MESSAGE');
  });

  it('GENERATE_USER_MESSAGE commits INCREMENT_SEQ', async () => {
    await chat.actions.GENERATE_USER_MESSAGE(context, {});
    expect(context.commit).toHaveBeenCalledWith('INCREMENT_SEQ');
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

  it('SEND_MENU dispatches SEND_MESSAGE', async () => {
    const code = 'jest';
    // const message = { message: { text: code, type: MessageType.TEXT } };
    context.dispatch = jest.fn(() => ({ seq: 1 }));
    await chat.actions.SEND_MENU(context, { code });
    const index = context.dispatch.mock.calls
    .findIndex(([action]) => action === 'SEND_MESSAGE');
    expect(index).not.toBe(-1);
  });

  it('SEND_DRAFT dispatches SEND_MESSAGE with properly formatted message', async () => {
    const draft = 'jest';
    context.state.draft = draft;
    // const message = { message: { text: draft, type: MessageType.TEXT } };
    context.dispatch = jest.fn(() => ({ seq: 1 }));
    await chat.actions.SEND_DRAFT(context);
    const index = context.dispatch.mock.calls
    .findIndex(([action]) => action === 'SEND_MESSAGE');
    expect(index).not.toBe(-1);
  });

  it('SEND_DRAFT trims spaces before SEND_MESSAGE dispatch', async () => {
    const result = 'jest';
    context.state.draft = `  ${result}  `;
    // const message = { message: { text: result, type: MessageType.TEXT } };
    context.dispatch = jest.fn(() => ({ seq: 1 }));
    await chat.actions.SEND_DRAFT(context);
    expect(context.dispatch.mock.calls[0][1].text).toBe(result);
  });

  it('SEND_FILES dispatches GENERATE_USER_MESSAGE on each passed file', async () => {
    const files = [{}, {}];
    await chat.actions.SEND_FILES(context, files);
    expect(context.dispatch.mock.calls.filter(([action]) => action
      === 'GENERATE_USER_MESSAGE').length).toBe(2);
  });

  it('SEND_FILES throws error if file size is larger than mediaMaxSize', () => {
    context.state.mediaMaxSize = 10;
    const file = { size: 11 };
    chat.actions.SEND_FILES(context, [file]);
    expect(context.dispatch.mock.calls.findIndex(([, message]) => message.type ===
      MessageType.ERROR))
    .not.toBe(-1);
  });

  it('SEND_FILES dispatches _UPLOAD_FILE', async () => {
    const file = {};
    await chat.actions.SEND_FILES(context, [file]);
    expect(context.dispatch.mock.calls.findIndex(([name]) => name ===
      '_UPLOAD_FILE'))
    .not.toBe(-1);
  });

  it('_UPLOAD_FILE dispatches SEND_MESSAGE', async () => {
    context.rootState = { config: { chat: { url: 'jest' } } };
    const fileLink = {};

    jest.spyOn(ChatAPI, 'sendFile')
    .mockImplementationOnce(jest.fn(() => [fileLink]));

    const file = {};
    const messageMock = { file };
    const seq = 22;

    await chat.actions._UPLOAD_FILE(context, { file, seq, messageMock });

    const index = context.dispatch.mock.calls
    .findIndex(([action]) => action === 'SEND_MESSAGE');
    expect(context.dispatch.mock.calls[index][1].message).toBeInstanceOf(Message);
  });

  it('SET_DRAFT commits SET_DRAFT with passed value', () => {
    const draft = 'jest';
    chat.actions.SET_DRAFT(context, draft);
    expect(context.commit).toHaveBeenCalledWith('SET_DRAFT', draft);
  });

  it('SET_CONNECTION_STATUS commits SET_CONNECTION_STATUS with passed value', () => {
    const status = true;
    chat.actions.SET_CONNECTION_STATUS(context, status);
    expect(context.commit)
    .toHaveBeenCalledWith('SET_CONNECTION_STATUS', status);
  });

  it('LISTEN_ON_MESSAGE subscribes on all "regular" message types', () => {
    chat.actions.LISTEN_ON_MESSAGE(context, () => {});
    expect(context.commit.mock.calls.find(([, params]) => params.event)[1].event)
    .toEqual([
      MessageType.TEXT,
      MessageType.FILE,
    ]);
  });
});
