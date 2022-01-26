const { SlashCommandBuilder } = require("@discordjs/builders");
const { Message } = require("discord.js");
const wait = require("util").promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("코쟁이 봇이 반갑게 인사합니다."),
    async execute(interaction) {
        await interaction.reply("반가워!");
        await wait(15000);
        await interaction.deleteReply();
        console.log(interaction.options.data);
    }
}