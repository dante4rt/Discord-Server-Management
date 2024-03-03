const Discord = require('discord-simple-api');
const schedule = require('node-schedule');
const CommandManager = require('discord-command-manager');

class ServerManagementBot {
  constructor(token) {
    if (!token) {
      throw new Error('Please provide a bot token');
    }
    this.discord = new Discord(token);
    this.commandManager = new CommandManager(this.discord);

    this.registerCommands();
  }

  registerCommands() {
    this.commandManager.registerCommand('help', async (args, message) => {
      await this.discord.sendMessageToChannel(
        message.channel.id,
        "Here's a list of available commands..."
      );
    });
  }

  scheduleMessage(channelId, message, scheduleTime) {
    schedule.scheduleJob(scheduleTime, async () => {
      try {
        await this.discord.sendMessageToChannel(channelId, message);
        console.log(`Scheduled message sent to channel ${channelId}`);
      } catch (error) {
        console.error('Failed to send scheduled message:', error);
      }
    });
  }

  async displayServerStats(args, message) {
    try {
      const guildId = message.guild.id;
      const guildInfo = await this.discord.getGuild(guildId);
      const responseMessage = `Server Name: ${guildInfo.name}\nTotal Members: ${guildInfo.member_count}`;
      await this.discord.sendMessageToChannel(
        message.channel.id,
        responseMessage
      );
    } catch (error) {
      console.error('Failed to fetch server stats:', error);
    }
  }

  listenForCommands() {
    this.discord.on('message', (message) => {
      this.commandManager.handleMessage(message);
    });
  }
}

module.exports = ServerManagementBot;
