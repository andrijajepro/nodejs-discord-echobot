const Discord = require('discord.js');
const { exec } = require('child_process');
const keep_alive = require('./keep_alive.js')

const client = new Discord.Client();
const prefix = '!';

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
client.login('TOKEN');
