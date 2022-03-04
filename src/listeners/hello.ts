import { Client, Message } from 'discord.js';
import { greetings } from '../constants/greetings';

const checkTimeRange = (time: number) => {
  if (time >= 5 && time < 12) {
    return 'Good morning';
  } else if (time >= 12 && time < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

export default (client: Client): void => {
  client.on('messageCreate', async (messageCreate: Message) => {
    const author = messageCreate.author.username
      ? messageCreate.author.username
      : 'Human';

    const time = new Date().getHours();

    const userMessage = messageCreate.content.toLocaleLowerCase();

    if (greetings.includes(userMessage)) {
      messageCreate.reply(
        `${checkTimeRange(time)}, ${author} glad to see you.`,
      );
    }
  });
};
