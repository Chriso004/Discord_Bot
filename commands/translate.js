const translate = require("googletrans").default;
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("번역")
        .setDescription("번역하고 싶은 말을 적어보세요!")
        .addStringOption(option => {
            return option
                .setName("text")
                .setDescription("단어나 문장을 입력하세요.")
                .setRequired(true);
        }),
        async execute(interaction) {
            const text = interaction.options.getString("text");
            const language = "ko"
            const result = translateText(text, language);
            result.then(async result => {
                await interaction.reply(`${text} => ${result}`);
                console.log(isKor(text));
            })
        }
}

async function translateText(text, language = "ko") {
    if(isKor(text)) language = "en";
    try {
        const result = await translate(text, language);
        return result.text;
    }
    catch(error) {
        console.log(error);
    }
}

function isKor(str) {
    const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
    return regExp.test(str) == true ? true : false;
}
