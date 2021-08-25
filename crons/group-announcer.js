const moment = require('moment');

const group4Hours = ['04:40', '08:40', '12:40', '16:40', '20:40', '00:40'];
const group1Hours = ['05:40', '09:40', '13:40', '17:40', '21:40', '01:40'];
const group2Hours = ['06:40', '10:40', '14:40', '18:40', '22:40', '02:40'];
const group3Hours = ['07:40', '11:40', '15:40', '19:40', '23:40', '03:40'];

const messages = [
	'Lets get those LE',
	'Farming time 🌼',
	'Another hour of hard watering! 💦',
	'It is time to farm!',
	'Next group in 1 hour',
	'Long wait? 😁',
];

module.exports = {
	name: 'group-announcer',
	description: 'Send updates of group',
	cron: '*/40 * * * *',
	execute: async (client, Discord) => {
		const guild = client.guilds.cache.get('879653561665986611');
		const channel = guild.channels.cache.get('879843545165471784');

		const date = moment().utc().format('HH:mm');
		console.log(date);
		console.log(group1Hours.includes(date));
		console.log(group2Hours.includes(date));
		console.log(group3Hours.includes(date));
		console.log(group4Hours.includes(date));

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
	},
};
