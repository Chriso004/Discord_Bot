const axios = require("axios");
const cheerio = require("cheerio");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("코로나")
        .setDescription("코로나 일일 확진자 수를 알려줍니다."),
    async execute = interaction => {
        const dsTable = getData();
        dsTable.then(async dsTable => {
            const message = makeMessageEmbed(dsTable);
            const img = new MessageAttachment("./src/img/circle.jpg");
            await interaction.reply({ embeds: [message], files:[img] });
        })
            .catch(error => {
                console.log(error);
            })
    }
}

const makeMessageEmbed = dsTable => {
    const message = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("코로나 확진자 수")
        .setURL("http://ncov.mohw.go.kr/")
        .setDescription("코로나 확진자 정보 입니다.")
        .setThumbnail("attachment://circle.jpg")
        .addFields(
            { name: "\u200B", value: "\u200B"},
            { name: "일일 확진자", value: "\u200B"},
            { name: "사망", value: dsTable[0]["사망"], inline: true},
            { name: "위중증", value: dsTable[0]["위중증"], inline: true},
            { name: "확진", value: dsTable[0]["확진"], inline: true},
            { name: "\u200B", value: "\u200B"},
            { name: "주간 확진자", value: "\u200B"},
            { name: "사망", value: dsTable[1]["사망"], inline: true},
            { name: "위중증", value: dsTable[1]["위중증"], inline: true},
            { name: "확진", value: dsTable[1]["확진"], inline: true},
            { name: "\u200B", value: "\u200B"},
        )
        .setTimestamp()
    return message;
}

const getResponse = async () => {
    return await axios.get("http://ncov.mohw.go.kr/")
        .catch(error => {
            console.log(error.response);
        })
}

const getData = async () => {
    return getResponse().then(response => {
        const ds = []
        const $ = cheerio.load(response.data);

        $(".occurrenceStatus .ds_table tbody tr").map(function (index, element) {
            const dsTable = {}
            dsTable["사망"] = String($(element).find("td:nth-of-type(1)").text());
            dsTable["위중증"] = String($(element).find("td:nth-of-type(2)").text());
            dsTable["신규입원"] = String($(element).find("td:nth-of-type(3)").text());
            dsTable["확진"] = String($(element).find("td:nth-of-type(4)").text());
            ds.push(dsTable);
        })

        return ds;
    })
}