const {RichEmbed } = require('discord.js');

module.exports = async (type, message, data) => {

if(type == 'plain')
  return plain(message, data);
else if(type == 'rich')
  return rich(message, data)
}


function plain(message, data){
  if(message.content === 'hi' || message.content === 'hello'){
    message.reply('hey !');
  }else if( message.content === 'ping'){
    message.reply('pong');
  }else if(data){
    message.reply(data);
  }
}

function rich(message, data){
  const embed = new RichEmbed()

  if(data.title)
    embed.setTitle(data.title)
  if(data.description)
    embed.setDescription(data.description)
  if(data.color)
    embed.setColor(data.color)    
  if(data.url)
    embed.setURL(data.url)
  if(data.thumbnail)
    embed.setThumbnail(data.thumbnail)
  if(data.image)
    embed.setImage(data.image)
  if(data.footer)
    embed.setFooter(data.footer)
  embed.setTimestamp()
  
  message.channel.send(embed);
}