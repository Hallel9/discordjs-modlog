const mongoose = require("mongoose");
const chalk = require("chalk");
const Schema = require("../models/mod-log");
let mongoURL;

class ModLog {
  constructor(options = {}) {
    if (!options.database) throw new TypeError("You must specify a database");

    this.setURL(options.db);
  }
  /**
   * @param {String} str mongoose connection string
   */
  static async setURL(str) {
    if (!str)
      throw new TypeError("Please specify a mongoose connection string");
    mongoURL = str;
    return mongoose
      .connect(str, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => console.log(chalk.green("Connected to mongodb!")))
      .catch((e) => console.log(`Error connecting to db: ${e}`));
  }
  /**
   * @param {String} Guild
   * @param {String} Channel
   */
  static async setModLog(Guild, Channel) {
		if (typeof Guild != 'string') throw new TypeError('The guildID must be a type of String');
    const isChannel = await Schema.findOne(
      {
        Guild,
      },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          data.Channel = Channel;
          data.save();
        } else {
          new Schema({
            Guild,
            Channel,
          }).save();
          return isChannel;
        }
        const guild = data.Guild;
        const channel = guild.channels.cache.get(data.Channel);
        return channel.send(`Channel now set to ${channel}`);
      }
    );
  }
}

module.exports = ModLog;
