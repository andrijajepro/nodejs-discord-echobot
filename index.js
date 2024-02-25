const Discord = require('discord.js');
const { exec } = require('child_process');
const keep_alive = require('./keep_alive.js')

const client = new Discord.Client();
const prefix = '!';
client.on('ready', () => {
  console.log(`Bot je online kao ${client.user.tag}!`);
});

client.on('ready', () => {
  console.log(`Bot is online as ${client.user.tag}`);

  // Set the interval to 24 hours (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  setInterval(() => {
  console.log('Executing the interval function.');

  const channelId = '994666508254978220';
  const channel = client.channels.cache.get(channelId);

  if (channel) {
    console.log('Channel found, attempting to send message.');
    channel.send('I\'m ok!')
      .then(() => console.log('Message sent successfully.'))
      .catch(error => console.error('Error sending message:', error));
  } else {
    console.error('Channel not found. Make sure the provided channel ID is correct.');
  }
}, 24 * 60 * 60 * 1000);
});
client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'command') {
    if (args.length === 0) {
      return message.reply('Morate navesti komandu koju želite izvršiti.');
    }

    const terminalCommand = args.join(' ');

    exec(terminalCommand, (error, stdout, stderr) => {
      if (error) {
        return message.reply(`Greška prilikom izvršavanja komande: ${error.message}`);
      }

      const output = stdout || stderr;
      message.channel.send(`**Izlaz iz komande:**\n\`\`\`${output}\`\`\``);
    });
  }
});

// Dodajte svoj bot token ovde
client.login(process.env.TOKEN);
