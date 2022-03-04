import { Client } from "discord.js";
import * as dotenv from "dotenv";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
	intents: [],
});

ready(client);
interactionCreate(client);

client.login(token);
