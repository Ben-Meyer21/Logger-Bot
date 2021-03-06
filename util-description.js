const Discord = require('discord.js')

const info = async (msg) => {
  const embed = new Discord.MessageEmbed()
    .setTitle('~Info about me~')
    .setColor('0x0000ff')
    .setDescription('Whenever You start your first log, i will capture the time to be your start time. For each 24 days from that time your days will be calculated.\nAs:\nFor 24 hours it will be day 1.\nNext 24 hours will be day 2 (no matter when you log afterwards).\n**There is no option to add in previous day** (and why would you log in previous day anyway).\nYou can also use multiple \`++add\` to push your current day logs together!\n\nUse \`++help\` to know more about my functionalities.')
    .setFooter('v1.1.0', msg.client.user.avatarURL())

    return embed
}

const help = async (msg) => {
  const embed = new Discord.MessageEmbed()
  .setTitle('All commands you can use!')
  .setColor('0x00ff00').setDescription(`Log your daily activities with these easy commands!!\n*Remember you cannot edit any logs of previous days. Hence choose wisely!*`)
  .addFields(
		{ name: '\`++add new_log\`', value: 'can add multiple logs for the same day!\nUpdate: \`++log new_log\`', inline:true },
	//	{ name: '\u200B', value: '\u200B' },
		{ name: '\`++list\`', value: 'to list all the logs', inline:true},
    { name: '\`++list {userTag}\`', value: 'to list the logs of the specified user.(logs will be shown only if the person has privacy turned off.)', inline:true},
    { name: '\`++privacy {on|off|null|userTag}\`', value: 'to set your privacy setting on or off. Or null to check your current settings.\nTag another user to check there privacy!!', inline:true},
    { name: '\`++update {log}\`', value: 'remove all logs of today and set the specified log as the only log.', inline:true},
		{ name: '\`++del {day_no}\`', value: 'delete all the logs for the day specified.', inline:true},
    {name: '\`++streak {userTag|null}\`', value: 'get the current streak for your or someone else\'s DaysOfCode!', inline:true},
    {name: '\`++info\`', value: 'Show information about I work.', inline:true},
    {name: '\`++profile {null|userTag}\`', value:'Show information about your account or someone else\'s Logger account.', inline:true })
  .setFooter('v1.1.0', msg.client.user.avatarURL())
  return embed
}

const stats = async(servers, users) => {
  const embed = new Discord.MessageEmbed()
    .setTitle('Logger Stats')
    .addFields(
      { name: 'Server Count', value: `${servers}`},
		  { name: 'User Count', value: `${users}`}
      )
    return embed
}

module.exports = {
  info,
  help,
  stats
}

//deprecated in v1.0.1
//{ name: '\`++privacy {off|null|userTag}\`', value: 'to set your privacy setting ~~on or~~ off. Or null to check your current settings.\n~~*Also when your privacy is on, the logs you \`++add\` will automatically be deleted so no need to worry!*~~(Deprecated)\nTag another user to check there privacy!!', inline:true},