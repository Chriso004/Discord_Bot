const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("안녕")
        .setDescription("코쟁이 봇이 반갑게 인사합니다."),
    async execute(interaction) {
        await interaction.reply("반가워!" + interaction.user.toString());
    }
}
