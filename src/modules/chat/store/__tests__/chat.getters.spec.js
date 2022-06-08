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
});
