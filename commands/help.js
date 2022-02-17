const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("명령어 목록입니다."),
    async execute = interaction => {
        const commandList = getCommands();
        await interaction.user.send({ embeds: [commandList] });
    }
}

const getCommands = () => {
    const commands = {};
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        if (file.toLowerCase().match("help") || file.match("deleteReply"))
            continue;
        const command = require(`./${file}`);
        commands[command.data.name] = command.data.description;
    }

    const message = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("명령어 목록")
        .addField("\u200B", "\u200B");

    for(const key in commands)
        message.addField(key, commands[key]);

    return message;
}