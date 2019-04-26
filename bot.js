const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require('fs');
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;
let profile = require('./profile.json');
fs.readdir(`./cmds/`,(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <=0) console.log("Нет комманд для загрузки");
    console.log(`загружено ${jsfiles.length} команд`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} Загружен`);
        bot.commands.set(props.help.name,props);
    })
});

bot.on('ready', () => {
  console.log(`Старт бота ${bot.user.username}!`);
  bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
      console.log(link);
  })
});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  let uid = message.author.id;
  let time = Math.round(Date.now()/1000);
  let sayText = message.content;
  let rUser = bot.rUser;
    console.log("===============================");
    console.log("Server: " + message.guild);
    console.log("channel: " + message.channel.name);
    console.log("User: " + message.author.username + "#" +message.author.discriminator + "  /id:" + message.author.id);
    if(sayText == ""){sayText = "Новый участник"};
    console.log("say: " + sayText);
    console.log("Время Unix: "+time);
    console.log("===============================");
  bot.send = function (msg){
     message.channel.send(msg);
     if(profile[uid].ban==true){
       console.log("Ban: "+profile[uid].ban);
       message.channel.send("Пользователь находится в списке банов")
       message.guild.member(rUser).ban("Бан");
      }
  };
  if(!profile[uid]){
    profile[uid] ={
      name:message.author.username + "#" +message.author.discriminator,
      id:message.author.id,
      mails:0,
      warns:0,
      ban:false,
    }
  }
  let u = profile[uid];
  u.mails++;

  fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
    if(err) console.log(err);
  })
  
  let user = message.author.username;
  let userid = message.author.id;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if (!message.content.startsWith(prefix)) return;
  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(bot,message,args);
  bot.rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  bot.uId = message.author.id;
});

bot.login(token);