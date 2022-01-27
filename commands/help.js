const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("명령어 목록입니다."),
    async execute(interaction) {
        const commandList = getCommands(interaction)
        return await interaction.user.send(commandList);
    }
}

function getCommands(interaction) {
    const commands = {};
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        if(file.toLowerCase().match("help"))
            continue;
        const command = require(`./${file}`);
        commands[command.data.name] = command.data.description;
    }

    let message = "";
        
    for(const key in commands)
        message += `/${key} - ${commands[key]}\n`;

    return message;
}