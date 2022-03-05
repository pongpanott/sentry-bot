import { BaseCommandInteraction, Client } from 'discord.js';
import { Command } from '../Command';

const Help: Command = {
  name: 'sentry',
  description: 'Sentry bot commands',
  type: 'CHAT_INPUT',
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const content = `commands \n
        !google [search] - to search on google. *ex. !google How to use a discord*
        `;

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

export default Help;
