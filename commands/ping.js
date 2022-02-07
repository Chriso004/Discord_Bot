const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("핑")
        .setDescription("핑을 알려줍니다."),
    async execute(interaction) {
        const ping = Date.now() - interaction.createdTimestamp;
        await interaction.reply(`현재 핑은: ${ping}ms 입니다.`);
    }
}
