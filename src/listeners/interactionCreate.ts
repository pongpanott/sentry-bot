import { BaseCommandInteraction, Client, Interaction } from 'discord.js';
import Commands from '../Commands';

const handleSlashCommand = async (
  client: Client,
  interaction: BaseCommandInteraction,
): Promise<void> => {
  const slashCommand = Commands.find(
    (command: { name: string }) => command.name === interaction.commandName,
  );

  if (!slashCommand) {
    interaction.followUp({ content: 'An error has occurred' });
    return;
  }

  await interaction.deferReply();

  slashCommand.run(client, interaction);
};

export default (client: Client): void => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleSlashCommand(client, interaction);
    }
  });
};
