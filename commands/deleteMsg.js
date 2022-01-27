const { SlashCommandBuilder } = require("@discordjs/builders");
const dotenv = require("dotenv");
const wait = require("util").promisify(setTimeout);

dotenv.config();

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
        await interaction.channel.bulkDelete(num);
        await interaction.reply(`${num}개의 메세지가 삭제되었습니다.`)
        if(process.env.autoDelete)
        {
            wait(30000)
            await interaction.deleteReply();
        }
    }
}