const Discord = require('discord.js');
const { exec } = require('child_process');

const client = new Discord.Client();
const channelId = '1211437963364409434';

client.on('message', (message) => {
  // Replace with your bot token
  if (message.channel.id !== channelId || message.author.bot) return;

  const command = message.content.trim();

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return message.reply(`Error executing command: ${error.message}`);
    }

    const output = stdout || stderr;
    message.channel.send(`**Command Output:**\n\`\`\`${output}\`\`\``);
  });
});

// Replace with your bot token
client.login(process.env.TOKEN);
