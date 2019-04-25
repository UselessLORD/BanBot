const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

    let embed = new Discord.RichEmbed()
    .setDescription("Информация")
    .setColor('#10c7e2')
    .addField("$ban [@name#0000]","Забанить")
    .addField("$kick [@name#0000]", "Выгнать")
    .addField("$warn [@name#0000]", "Предупреждение дать")
    .addField("$unwarn [@name#0000]", "Предупреждение снять")
    .addField("$info", "Информация о себе")
    .addField("$say [text]", "Сказать ботом")
    .addField("$link", "Приглашение бота на свой сервер")

    bot.send(embed);
};
module.exports.help = {
    name: "help"
};