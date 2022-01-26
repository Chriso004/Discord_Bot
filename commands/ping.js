const { SlashCommandBuilder } = require("@discordjs/builders");
const dotenv = require("dotenv");
const wait = require("util").promisify(setTimeout);

dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
        if(process.env.autoDelete)
            await wait(15000);
        await interaction.deleteReply();
    }
}