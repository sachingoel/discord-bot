const fs = require('fs');
const Discord = require("discord.js");
const mongoose = require("mongoose");
const client = new Discord.Client();

const config = require('./config.json');

fs.readdir('./app/events', (err,events)=>{
  events.forEach(event =>{
    const eventHandler = require(`./app/events/${event}`);
    const eventName = event.split('.')[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  })
});

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/discord`,{ useNewUrlParser: true });
client.login(config.discord.bot.token);