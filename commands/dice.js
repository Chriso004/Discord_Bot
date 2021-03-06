const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("주사위")
        .setDescription("1 ~ 100중 랜덤한 숫자 하나를 골라줍니다."),
    async execute = interaction => {
        const random = getRandom();
        await interaction.reply(interaction.user.toString() + " 주사위! " + random);
    }
}

const getRandom = () => {
    const random = Math.floor((Math.random() * 100) + 1);
    return random;
}