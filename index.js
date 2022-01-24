const { Client, Intents } = require('discord.js');
const config = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.login(config.BOT_TOKEN);

client.on("ready", () => {
    console.log('Logged in  as ${client.user.tag}!');
});