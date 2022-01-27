const { SlashCommandBuilder } = require("@discordjs/builders");
const dotenv = require("dotenv");
const wait = require("util").promisify(setTimeout);

dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("핑")
        .setDescription("핑을 알려줍니다."),
    async execute(interaction) {
        const ping = Date.now() - interaction.createdTimestamp;
        await interaction.reply(`현재 핑은: ${ping}ms 입니다.`);
        if(process.env.autoDelete)
        {        
            await wait(30000);
            await interaction.deleteReply();
        }
    }
}
