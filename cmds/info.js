const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../profile.json");
module.exports.run = async (bot,message,args) => {
    let a = message.author
    let id = message.author.id;
    let embed = new Discord.RichEmbed()
    .setDescription("Информация о пользователе")
    .setColor('#10c7e2')
    .addField("Имя",a.username)
    .addField("Тэг",a.tag)
    .addField("Сообщений",profile[id].mails)
    .addField("Предупреждений",profile[id].warns)
    .addField("ID",a.id)

    .setThumbnail(a.avatarURL)

    bot.send(embed);

};
module.exports.help = {
    name: "info"
};