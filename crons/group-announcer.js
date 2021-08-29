const moment = require('moment');

const group1Hours = ['01:45', '04:45', '07:45', '10:45', '13:45', '16:45', '19:45', '22:45'];
const group2Hours = ['02:15', '05:15', '08:15', '11:15', '14:15', '17:15', '20:15', '23:15'];
const group3Hours = ['02:45', '05:45', '08:45', '11:45', '14:45', '17:45', '20:45', '23:45'];
const group4Hours = ['03:15', '06:15', '09:15', '12:15', '15:15', '18:15', '21:15', '00:15'];
const group5Hours = ['03:45', '06:45', '09:45', '12:45', '15:45', '18:45', '21:45', '00:45'];
const group6Hours = ['04:15', '07:15', '10:15', '13:15', '16:15', '19:15', '22:15', '01:15'];

const messages = [
	'Lets get those LE',
	'Farming time 🌼',
	'Another hour of hard watering! 💦',
	'It is time to farm!',
	'Long wait? 😁',
];

module.exports = {
	name: 'group-announcer',
	description: 'Send updates of group',
	cron: '15,45 * * * *',
	execute: async (client, Discord) => {
		const guild = client.guilds.cache.get('879653561665986611');
		const channel = guild.channels.cache.get('879843545165471784');

		const date = moment().utc().format('HH:mm');

		if (group1Hours.includes(date))
			return await channel.send(
				`<@&${'879774447211515944'}> turn. ${messages[Math.floor(Math.random() * messages.length)]}`
			);

		if (group2Hours.includes(date))
			return await channel.send(
				`<@&${'879774496599445544'}> turn. ${messages[Math.floor(Math.random() * messages.length)]}`
			);

		if (group3Hours.includes(date))
			return await channel.send(
				`<@&${'879774522801291264'}> turn. ${messages[Math.floor(Math.random() * messages.length)]}`
			);

		if (group4Hours.includes(date))
			return await channel.send(
				`<@&${'879979445149130782'}> turn. ${messages[Math.floor(Math.random() * messages.length)]}`
			);

		if (group5Hours.includes(date))
			return await channel.send(
				`<@&${'881544844525305876'}> turn. ${messages[Math.floor(Math.random() * messages.length)]}`
			);

		if (group6Hours.includes(date))
			return await channel.send(
				`<@&${'881544926591086632'}> turn. ${messages[Math.floor(Math.random() * messages.length)]}`
			);
	},
};
