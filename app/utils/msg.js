const UserMsg = require('../models/Msg');

const MsgUtils = {
  saveUserMsg : async function(message){

    // If message is triggered by user save it in db
    if(!(message.author || {}).bot){
      let msg = {
        author:{
          username : (message.author || {}).username,
          id       : (message.author || {}).id,
          email    : (message.author || {}).email  
        },
        content    : message.content,
        msgId      : message.id
      }
      const userMessage = new UserMsg(msg);
      return await userMessage.save();
    }
  },

  getUserMsg : async function(content, userId){
    const messages =  await UserMsg.find({
      "content"   : {"$regex" : `.*${content}.*`, "$options": "i"},
      "author.id" : userId
    }).distinct("content").lean().exec();
    return messages.join(', ');
  }
}

module.exports = MsgUtils;
