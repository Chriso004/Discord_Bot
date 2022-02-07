const fs = require("fs");
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./token.json');

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    if(file.match("deleteReply"))
        continue;
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
    
    client.on('interactionCreate', async interaction => {
        const user = await interaction.member.fetch();
        const channel = await user.voice.channel;

        if(!channel)
        {
            await interaction.reply("먼저 음성채널에 입장하세요.");
            return;
        }

        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName.toLocaleLowerCase());
        
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '잘못된 명령어 입니다.', ephemeral: false });
        }
        
    });
});

client.login(token);