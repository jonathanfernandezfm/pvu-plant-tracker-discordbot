const moment = require('moment');

const group1Hours = ['00:40', '03:40', '06:40', '09:40', '12:40', '15:40', '18:40', '21:40'];
const group2Hours = ['01:40', '04:40', '07:40', '10:40', '13:40', '16:40', '19:40', '22:40'];
const group3Hours = ['02:40', '05:40', '08:40', '11:40', '14:40', '17:40', '20:40', '23:40'];
// const group4Hours = ['06:30', '10:30', '14:30', '18:30', '22:30', '02:30'];

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

		// if (group4Hours.includes(date))
		// 	return await channel.send(
		// 		`<@&${'879979445149130782'}> turn. ${messages[Math.floor(Math.random() * messages.length)]}`
		// 	);
	},
};
