const { SlashCommandBuilder } = require("@discordjs/builders");
const dotenv = require("dotenv");
const wait = require("util").promisify(setTimeout);

dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("핑")
        .setDescription("핑을 알려줍니다."),
    async execute(interaction) {
        await interaction.reply(client.ping);
        if(process.env.autoDelete)
        {        
            await wait(15000);
            await interaction.deleteReply();
        }
    }
}