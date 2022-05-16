import MessageType from '../../enums/MessageType.enum';
import parseMessage from '../parseMessage';

describe('parseMessage', () => {
  let input;
  let output;

  beforeEach(() => {
    input = { message: { foo: [{ jest: 'jest' }] }, seq: 1 };
    output = { message: { foo: [{ jest: 'jest' }] }, seq: 1 };
  });

  it('correctly parses no-type message (MessageType.INIT)', () => {
    const input = { jest: 'jest', msg: [] };
    const output = {
      message: { jest: 'jest', msg: [], type: MessageType.INIT },
    };
    expect(parseMessage(input)).toEqual(output);
  });
  it('correctly parses Text message (MessageType.TEXT)', () => {
    input.message.type = MessageType.TEXT;
    output.message.type = MessageType.TEXT;
    expect(parseMessage(input)).toEqual(output);
  });
  it('correctly parses File message (MessageType.FILE)', () => {
    input.message.type = MessageType.FILE;
    output.message.type = MessageType.FILE;
    expect(parseMessage(input)).toEqual(output);
  });
  it('correctly parses Contact message (MessageType.CONTACT)', () => {
    input.message.type = MessageType.CONTACT;
    output.message.type = MessageType.CONTACT;
    expect(parseMessage(input)).toEqual(output);
  });
  it('correctly parses Joined message (MessageType.JOINED)', () => {
    input.message.type = MessageType.JOINED;
    output.message.type = MessageType.JOINED;
    expect(parseMessage(input)).toEqual(output);
  });
  it('correctly parses Left message (MessageType.LEFT)', () => {
    input.message.type = MessageType.LEFT;
    output.message.type = MessageType.LEFT;
    expect(parseMessage(input)).toEqual(output);
  });
  it('correctly parses Closed message (MessageType.CLOSED)', () => {
    input.message.type = MessageType.CLOSED;
    output.message.type = MessageType.CLOSED;
    expect(parseMessage(input)).toEqual(output);
  });
});
