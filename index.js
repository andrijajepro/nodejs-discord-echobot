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

  // Set the interval to 15 seconds (15 seconds * 1000 milliseconds)
  setInterval(() => {
    // Get the channel ID where you want to send the message
    const channelId = '994666508254978220';

    // Fetch the channel by ID
    const channel = client.channels.cache.get(channelId);

    if (channel) {
      // Send the message
      channel.send('I\'m ok!')
        .then(() => console.log('Message sent successfully.'))
        .catch(error => console.error('Error sending message:', error));
    } else {
      console.error('Channel not found. Make sure the provided channel ID is correct.');
    }
  }, 15 * 1000); // 15 seconds interval
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
