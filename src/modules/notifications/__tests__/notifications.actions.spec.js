import getContextMock from '../../../../tests/unit/mock/store/contextMock';
import notifications from '../notifications';

describe('notifications module: actions', () => {
  let context;
  beforeEach(() => {
    context = getContextMock(jest);
  });

  it('HANDLE_CHAT_MESSAGE dispatches PLAY_SOUND action', () => {
    notifications.actions.HANDLE_CHAT_MESSAGE(context);
    expect(context.dispatch.mock.calls[0][0]).toBe('PLAY_SOUND');
  });
});
