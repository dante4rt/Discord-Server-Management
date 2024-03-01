# Discord Server Management

The `discord-server-management` is a powerful and versatile tool designed to automate and enhance the management of Discord servers. Built on top of the `discord-simple-api`, it offers features like scheduled messaging, auto-moderation, auto-role assignment, welcome and goodbye messages, and more, simplifying server administration and improving member engagement.

## Features

- **Scheduled Messaging:** Automatically send messages in specific channels at predefined times.
- **Auto-role Assignment:** Automatically assign roles to new members upon joining.
- **Auto-moderation:** Delete messages containing banned words.
- **Welcome Messages:** Send personalized welcome messages to new members.
- **Goodbye Messages:** Post messages in a channel when members leave.
- **Server Stats Display:** Fetch and display server statistics.

## Installation

Install the package via npm:

```bash
npm install discord-server-management
```

## Usage

To use the `discord-server-management`, you need to import it into your project and instantiate it with a valid Discord bot token.

```javascript
const ServerManagementBot = require('discord-server-management');

const bot = new ServerManagementBot('<YOUR_DISCORD_BOT_TOKEN>');

// Schedule a message
bot.scheduleMessage(
  '<CHANNEL_ID>',
  'Hello, world!',
  new Date(Date.now() + 5000)
);

// Assign a role to a new member (should be triggered by an event)
bot.autoAssignRoleOnJoin('<GUILD_ID>', '<MEMBER_ID>', '<ROLE_ID>');

// More functionalities...
```

### Auto-Moderation Example

Here’s how you can use the bot to delete messages with banned words:

```javascript
bot.deleteMessageWithBannedWords('<CHANNEL_ID>', [
  'bannedWord1',
  'bannedWord2',
]);
```

### Welcome Message Example

Send a welcome message to new members:

```javascript
bot.sendWelcomeMessage('<GUILD_ID>', '<MEMBER_ID>', 'Welcome to the server!');
```

## Configuration

To fully utilize the bot, you might need to configure various features according to your server's needs.

## Contributing

Contributions to the `discord-server-management` are welcome.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
