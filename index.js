const Discord = require('discord-simple-api');
const schedule = require('node-schedule');

class ServerManagementBot {
  constructor(token) {
    if (!token) {
      throw new Error('Please provide a bot token');
    }
    this.discord = new Discord(token);
  }

  // Schedule a message to be sent to a channel
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

  // Listen for a new member joining and auto-assign a role
  async autoAssignRoleOnJoin(guildId, memberId, roleId) {
    try {
      await this.discord.addRoleToMember(guildId, memberId, roleId);
      console.log(
        `Auto-assigned role ${roleId} to new member ${memberId} in guild ${guildId}`
      );
    } catch (error) {
      console.error('Failed to auto-assign role on member join:', error);
    }
  }

  // New Functionality: Auto-moderation for Banned Words
  async deleteMessageWithBannedWords(channelId, bannedWords) {
    const messages = await this.discord.getMessagesInChannel(channelId, 100);
    messages.forEach(async (message) => {
      if (bannedWords.some((word) => message.content.includes(word))) {
        try {
          await this.discord.deleteMessageInChannel(channelId, message.id);
          console.log(
            `Deleted message with banned word in channel ${channelId}`
          );
        } catch (error) {
          console.error('Failed to delete message:', error);
        }
      }
    });
  }

  // New Functionality: Welcome Message for New Members
  async sendWelcomeMessage(guildId, memberId, welcomeMessage) {
    try {
      await this.discord.sendDirectMessage(memberId, {
        content: welcomeMessage,
      });
      console.log(
        `Welcome message sent to new member ${memberId} in guild ${guildId}`
      );
    } catch (error) {
      console.error('Failed to send welcome message:', error);
    }
  }

  // New Functionality: Goodbye Message for Leaving Members
  async sendGoodbyeMessage(channelId, memberId, goodbyeMessage) {
    try {
      await this.discord.sendMessageToChannel(
        channelId,
        goodbyeMessage.replace('{user}', memberId)
      );
      console.log(
        `Goodbye message posted in channel ${channelId} for member ${memberId}`
      );
    } catch (error) {
      console.error('Failed to send goodbye message:', error);
    }
  }

  // New Functionality: Fetch and Display Server Stats
  async displayServerStats(guildId) {
    try {
      const guildInfo = await this.discord.getGuild(guildId); 
      const message = `Server Name: ${guildInfo.name}\nTotal Members: ${guildInfo.member_count}`;
      console.log(message);
    } catch (error) {
      console.error('Failed to fetch server stats:', error);
    }
  }
}

module.exports = ServerManagementBot;
