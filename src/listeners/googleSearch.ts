import { Client, Message, MessageEmbed } from 'discord.js';
import axios, { AxiosRequestConfig } from 'axios';
import * as dotenv from 'dotenv';
import { sentryImageUrl } from '../constants';

dotenv.config();

export default (client: Client): void => {
  client.on('messageCreate', async (messageCreate: Message) => {
    const userMessage = messageCreate.content;

    const userCommand = userMessage.substring(0, userMessage.indexOf(' '));
    const query = encodeURI(
      userMessage.substring(userMessage.indexOf(' ') + 1),
    );

    console.log('query', query);

    if (userCommand === '!google') {
      const config: AxiosRequestConfig = {
        method: 'get',
        url:
          `https://customsearch.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API}&cx=${process.env.CX}&q=` +
          query,
        headers: {},
      };

      axios(config)
        .then(response => {
          const searchTerm = response.data.queries.request[0].searchTerms;

          const result = response.data.items;
          const resultArray: {
            name: string;
            value: string;
          }[] = [];

          result.forEach((item: any) => {
            const resultObject = {
              name: item.title ? item.title : '',
              value: item.snippet ? `[${item.snippet}](${item.link})` : '',
            };

            resultArray.push(resultObject);
          });

          const exampleEmbed = new MessageEmbed()
            .setColor('#4285f4')
            .setTitle(searchTerm)
            .setURL('')
            .setAuthor({
              name: '',
              iconURL: '',
              url: '',
            })
            .addFields(resultArray)
            .setTimestamp()
            .setFooter({
              text: 'sentry bot',
              iconURL: sentryImageUrl,
            });

          messageCreate.reply({ embeds: [exampleEmbed] });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
};
