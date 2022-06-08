import MessageType from '../../enums/MessageType.enum';
import chat from '../chat';

describe('chat module: mutations', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it('SET_MESSAGE_CLIENT sets passed messageClient', () => {
    const value = 'jest';
    chat.mutations.SET_MESSAGE_CLIENT(state, value);
    expect(state.messageClient).toEqual(value);
  });

  it('SET_MESSAGES sets passed messages', () => {
    const value = 'jest';
    chat.mutations.SET_MESSAGES(state, value);
    expect(state.messages).toEqual(value);
  });

  it('SET_USER sets passed user', () => {
    const value = 'jest';
    chat.mutations.SET_USER(state, value);
    expect(state.user).toEqual(value);
  });

  it('SET_MEDIA_MAX_SIZE sets passed mediaMaxSize', () => {
    const value = 'jest';
    chat.mutations.SET_MEDIA_MAX_SIZE(state, value);
    expect(state.mediaMaxSize).toEqual(value);
  });

  it('SET_DRAFT sets passed draft', () => {
    const value = 'jest';
    chat.mutations.SET_DRAFT(state, value);
    expect(state.draft).toEqual(value);
  });

  it('REPLACE_MESSAGE_BY_SEQ does its work', () => {
    const seq = 1;
    const oldMsg = { jest: 'old', seq };
    const newMsg = { jest: 'new' };
    state.messages = [oldMsg];
    chat.mutations.REPLACE_MESSAGE_BY_SEQ(state, { message: newMsg, seq });
    expect(state.messages).toEqual([newMsg]);
  });

  it('REMOVE_MESSAGE_BY_SEQ does its work', () => {
    const seq = 1;
    const oldMsg = { jest: 'old', seq };
    state.messages = [oldMsg];
    chat.mutations.REMOVE_MESSAGE_BY_SEQ(state, seq);
    expect(state.messages).toEqual([]);
  });

  it('PUSH_MESSAGE adds message to the end of messages', () => {
    const msg = { jest: 'old' };
    state.messages = [];
    chat.mutations.PUSH_MESSAGE(state, msg);
    expect(state.messages).toEqual([msg]);
  });

  it('INCREMENT_SEQ does its work', () => {
    chat.mutations.INCREMENT_SEQ(state, 1);
    expect(state.seq).toEqual(2);
  });

  it('SET_CONNECTION_STATUS sets passed isConnectionClosed', () => {
    const value = 'jest';
    chat.mutations.SET_CONNECTION_STATUS(state, value);
    expect(state.isConnectionClosed).toEqual(value);
  });

  it('ADD_LISTENER adds callback for passed event', () => {
    state._listeners = {
      [MessageType.CONTACT]: [],
    };
    const callback = () => {};
    chat.mutations.ADD_LISTENER(state, { event: MessageType.CONTACT, callback });
    expect(state._listeners[MessageType.CONTACT]).toContain(callback);
  });
});
