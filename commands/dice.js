const { SlashCommandBuilder } = require("@discordjs/builders");
const dotenv = require("dotenv");
const wait = require("util").promisify(setTimeout);

dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("주사위")
        .setDescription("1 ~ 100중 랜덤한 숫자 하나를 골라줍니다."),
    async execute(interaction) {
        const random = Math.floor((Math.random() * 100) + 1);
        await interaction.reply(interaction.user.toString() + " 주사위! " + random);
        if(process.env.autoDelete)
        {
            await wait(15000);
            await interaction.deleteReply();
        }
    }
}