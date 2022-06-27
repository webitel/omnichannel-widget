import chat from '../chat';

describe('chat module: getters', () => {
  it('IS_MY_MESSAGE correctly computes "my" message (strictly) - true case', () => {
    const contact = 'jest';
    const state = { user: { contact } };
    const message = { from: { contact } };

    expect(chat.getters.IS_MY_MESSAGE(state)(message)).toBe(true);
  });
  it('IS_MY_MESSAGE correctly computes "my" message (strictly) - false case', () => {
    const contact = 'jest';
    const state = { user: { contact } };
    const message = { from: { contact: '123' } };

    expect(chat.getters.IS_MY_MESSAGE(state)(message)).toBe(false);
  });

  const myMsg = { id: 1 };
  const btnsMsg1 = { id: 2 };
  const btnsMsg2 = { id: 3 };
  const IS_MY_MESSAGE = (msg) => msg === myMsg;
  const getters = { IS_MY_MESSAGE };
  it('SHOW_BUTTONS correctly computes no-buttons if my message is after buttons', () => {
    const state = { messages: [btnsMsg1, myMsg] };
    expect(chat.getters.SHOW_BUTTONS(state, getters)(btnsMsg1)).toBe(false);
  });
  it('SHOW_BUTTONS correctly computes buttons on two messages if no next myMsg', () => {
    const state = { messages: [btnsMsg1, btnsMsg2] };
    expect(chat.getters.SHOW_BUTTONS(state, getters)(btnsMsg1)).toBe(true);
    expect(chat.getters.SHOW_BUTTONS(state, getters)(btnsMsg2)).toBe(true);
  });
});
