const axios = require("axios");
const cheerio = require("cheerio");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("메이플")
        .setDescription("당신의 스펙은?")
        .addStringOption(option => {
            return option
                .setName("nickname")
                .setDescription("캐릭터 이름을 적어주세요.")
                .setRequired(true)
        }),
    async execute = interaction => {
        const nickName = interaction.options.getString("nickname").trim();
        const message = await isExist(nickName).then(async response => {
            return makeMessageEmbed(response, nickName);
        }).catch(error => {
            console.log(error);
        })

        await interaction.reply({ embeds: [message]});
    }
}

const isExist = async nickName => {
    return await getResponse(nickName).then(response => {
        const $ = cheerio.load(response.data);
        const profile = $(".user-profile").html();
        if (!profile) return false;
        else return $;
    })
}

const getResponse = async nickName => {
    const encodeURL = encodeURI(`https://maple.gg/u/${nickName}`);
    return await axios.get(encodeURL)
        .catch(error => {
            console.log(error);
        });
}

const getSummary = $ => {
    const summary = {
        "레벨": "",
        "직업": "",
        "인기도": ""
    };

    const element = $(".user-summary ul");
    summary["레벨"] = $(element).find("li:nth-child(1)").text();
    summary["직업"] = $(element).find("li:nth-child(2)").text();
    summary["인기도"] = $(element).find("li:nth-child(3) span:nth-child(2)").text();

    return summary;
}

const getAdditionalSummary = $ => {
    const additionalSummary = {
        "길드": "",
        "종합랭킹": "",
        "월드랭킹": "",
        "직업랭킹(월드)": "",
        "직업랭킹(전체)": ""
    };

    const element = $(".user-additional");
    const keys = Object.keys(additionalSummary);

    for (let i = 1; i <= 5; i++) {
        let temp;
        if (i == 1)
            temp = $(element).find(`div:nth-child(${i}) > a`).text();
        else
            temp = $(element).find(`div:nth-child(${i}) > span`).text();

        temp = temp.split("\n").join("");
        temp = temp.split(" ").join("");
        additionalSummary[keys[i - 1]] = temp;
    }
    return additionalSummary;
}

const getImages = $ => {
    const urls = {
        "thumbnail": "",
        "icon": "",
        "server": ""
    }

    const thumbnailElement = $(".character-avatar-row > .col-md-8 img").attr();
    const iconElement = $(".col-lg-8 img").attr();
    
    urls["thumbnail"] = thumbnailElement.src;
    urls["icon"] = iconElement.src;
    urls["server"] = iconElement.alt;

    return urls;
}

const makeMessageEmbed = ($, nickName) => {
    const summary = getSummary($);
    const addedSummary = getAdditionalSummary($);
    const urls = getImages($);
    const message = new MessageEmbed()
        .setColor("#0099FF")
        .setTitle(`${nickName}`)
        .setDescription("유저 정보")
        .setURL(`https://maple.gg/u/${nickName}`)
        .setAuthor({ name: urls.server, iconURL: urls.icon, url: `https://maple.gg/u/${nickName}` })
        .setThumbnail(urls.thumbnail.url)
        .setImage(urls.thumbnail);
    for (const key in summary)
        message.addField(key, summary[key], true);
    
    message.addField("\u200B", "\u200B");

    for (const key in addedSummary)
        message.addField(key, addedSummary[key], true);

    return message;
}
