import { BaseCommandInteraction, Client, User } from "discord.js";
import { Command } from "../Command";

const checkTimeRange = (time: number) => {
	if (time >= 5 && time < 12) return "Good morning";
	else if (time >= 12 && time < 18) return "Good afternoon";
	else return "Good evening";
};

export const Hello: Command = {
	name: "hi",
	description: "Sentry greetings to you.",
	type: "CHAT_INPUT",
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		const username = interaction.user.username
			? interaction.user.username
			: "human";

		const time = new Date().getHours();

		const content = `${checkTimeRange(time)}, ${username}! glad to see you.`;

		await interaction.followUp({
			ephemeral: true,
			content,
		});
	},
};
