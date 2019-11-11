const mongoose = require("mongoose"),
      Schema = mongoose.Schema;


const MsgModel = new Schema({
	"author" : {
		"username" 	: {type: String},
		"id"				:	{type: String, required: true},
		"email"			:	{type: String}
	},
	"channel"			: {type: String, enum:['dm'], default:'dm'},
	"content"			:	{type: String},
	"msgId"				:	{type: String, unique:true}
});

const UserMsg = mongoose.model("Messages", MsgModel, 'Message');

module.exports = UserMsg;