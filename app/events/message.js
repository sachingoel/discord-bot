const kick = require('../commands/kick');
const reply = require('../commands/reply');
const googleUtils = require("../utils/google");
const MsgUtils = require("../utils/msg");

module.exports = async (client, message) => {

  // handling kick calls
  if (message.content.startsWith('!kick')) {
    return kick(message);
  }

  //handling google calls
  if(message.content.startsWith('!google')){
    const query = message.content.substr(message.content.indexOf(' ')+1);

    // Save google search messages in DB
    MsgUtils.saveUserMsg({...message,content:query});
    const results =  await googleUtils.search(message, query);
    results.forEach(result => {
      let richObj = {
        title       : result.title,
        description : result.snippet || 'NA',
        color       : '#00b300',
        image       : null,
        url         : result.link,
        footer      : result.displayLink 
      }
      if((result.pagemap || {}).cse_thumbnail && (result.pagemap || {}).cse_thumbnail.length >0)
        richObj['thumbnail'] = result.pagemap.cse_thumbnail[0].src;

      /**
       * if((result.pagemap || {}).cse_image && (result.pagemap || {}).cse_image.length >0)
       * richObj['image'] = result.pagemap.cse_image[0].src;
       */
      
      return reply('rich', message, richObj);
    });
  }

  //handling recent calls
  if(message.content.startsWith('!recent')){
    const query = message.content.substr(message.content.indexOf(' ')+1);
    const history = await MsgUtils.getUserMsg(query, (message.author || {}).id);
    return reply('plain', message, history);
  }

  //handling all other calls
  return reply('plain', message);
}