import { Message, MessageBox } from 'element-ui';

const Messenger = {
  info: Message.info,
  warning: Message.warning,
  success: Message.success,
  error: Message.error,
  confirm: MessageBox.confirm,
  prompt: MessageBox.prompt,
};

export { Messenger };