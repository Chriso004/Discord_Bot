const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: SlashCommandBuilder()
        .setName("번역")
        .setDescription("번역하고 싶은 말을 적어보세요!")
        .setStringOption(option => {
            return option
                .setName("text")
                .setDescription("단어나 문장을 입력하세요.")
                .setRequired(true);
        }),
        async execute(interaction) {
            
        }
}