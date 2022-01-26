const { SlashCommandBuilder } = require("@discordjs/builders");
const dotenv = require("dotenv");
const wait = require("util").promisify(setTimeout);

dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("주사위")
        .setDescription("행운을 빌어요!"),
    async execute(interaction) {
        const random = Math.round((Math.random() * 100) + 1);
        await interaction.reply(interaction.user.toString() + " 주사위! " + random);
        if(process.env.autoDelete)
        {
            await wait(15000);
            await interaction.deleteReply();
        }
    }
}