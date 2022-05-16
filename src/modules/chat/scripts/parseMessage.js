import MessageType from '../enums/MessageType.enum';

const parseMessage = ({
                        message, seq, type, ...rest
                      }) => {
  if (!message && !type) return { message: { ...rest, type: MessageType.INIT } }; // 1st message of session without type - init
  switch (message.type) {
    case MessageType.TEXT:
    case MessageType.FILE:
    case MessageType.CONTACT:
    case MessageType.JOINED:
    case MessageType.LEFT:
    case MessageType.CLOSED:
    default:
      return { message, seq };
  }
};

export default parseMessage;
