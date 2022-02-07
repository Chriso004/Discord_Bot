const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("청소")
        .setDescription("입력한 수 만큼 메세지를 삭제합니다.")
        .addIntegerOption(option => {
            return option
                .setName("num")
                .setDescription("1 ~ 100 사이의 수만 가능")
                .setRequired(true)
        }),
    async execute(interaction) {
        const num = interaction.options.getInteger("num");
        await interaction.channel.bulkDelete(num, true);
        if (num < 1 || num > 100)
            await interaction.reply("삭제할 메세지 수는 1에서 100까지 입니다.");
        else
            await interaction.reply(`${num}개의 메세지가 삭제되었습니다.`);
    }
}