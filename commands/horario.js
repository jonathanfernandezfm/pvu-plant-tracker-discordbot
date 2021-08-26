module.exports = {
	name: 'schedule',
	description: 'Returns latest schedule',
	aliases: ['horario', 'grupos'],
	cooldown: 120,
	help: '!schedule',
	execute: async (msg, args, client, Discord) => {
		const file = 'horario-25-08.png';

		const attachment = new Discord.MessageAttachment(`./assets/${file}`, 'schedule.png');
		msg.channel.send('**Updated: 25/08**', attachment).catch(console.error);
	},
};
