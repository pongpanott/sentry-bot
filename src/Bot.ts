import { Client, Intents } from 'discord.js';
import * as dotenv from 'dotenv';
import hello from './listeners/hello';
import interactionCreate from './listeners/interactionCreate';
import ready from './listeners/ready';

dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

ready(client);
interactionCreate(client);
hello(client);

client.login(token);
