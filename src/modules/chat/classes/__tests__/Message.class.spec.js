import MessageStatus from '../../enums/MessageStatus.enum';
import MessageType from '../../enums/MessageType.enum';
import Message from '../Message.class';

describe('Message class', () => {
  it('inits as message (with id)', () => {
    const msg = { id: 1 };
    expect(new Message(msg).createdAt).toBeFalsy();
  });
  it('inits as as preview (without id)', () => {
    const msg = { text: 'jest' };
    expect(new Message(msg).createdAt).toBeTruthy();
  });
  it('computes "status" getter as Error if notSent is true', async () => {
    const msg = new Message({});
    await msg.setSendingTimeout(0);
    expect(msg.status).toBe(MessageStatus.ERROR);
  });
  it('correclty computes "preview" getter for message', async () => {
    const msg = new Message({ id: 123 });
    expect(msg.preview).toBe(false);
  });

  let input;
  let output;

  beforeEach(() => {
    input = { id: 1, foo: [{ jest: 'jest' }] };
    output = { id: 1, foo: [{ jest: 'jest' }], _notSent: false, };
  });

  it('correctly parses Text message (MessageType.TEXT)', () => {
    input.type = MessageType.TEXT;
    output.type = MessageType.TEXT;
    expect(new Message(input)).toEqual(output);
  });
  it('correctly parses File message (MessageType.FILE)', () => {
    input.type = MessageType.FILE;
    output.type = MessageType.FILE;
    expect(new Message(input)).toEqual(output);
  });
  it('correctly parses Contact message (MessageType.CONTACT)', () => {
    input.type = MessageType.CONTACT;
    output.type = MessageType.CONTACT;
    expect(new Message(input)).toEqual(output);
  });
  it('correctly parses Joined message (MessageType.JOINED)', () => {
    input.type = MessageType.JOINED;
    output.type = MessageType.JOINED;
    expect(new Message(input)).toEqual(output);
  });
  it('correctly parses Left message (MessageType.LEFT)', () => {
    input.type = MessageType.LEFT;
    output.type = MessageType.LEFT;
    expect(new Message(input)).toEqual(output);
  });
  it('correctly parses Closed message (MessageType.CLOSED)', () => {
    input.type = MessageType.CLOSED;
    output.type = MessageType.CLOSED;
    expect(new Message(input)).toEqual(output);
  });
});
