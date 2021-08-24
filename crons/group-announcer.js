const moment = require('moment');

const group3Hours = ['5:40', '8:40', '11:40', '14:40', '17:40', '20:40', '23:40', '2:40'];
const group2Hours = ['4:40', '7:40', '10:40', '13:40', '16:40', '19:40', '22:40', '1:40'];
const group1Hours = ['3:40', '6:40', '9:40', '12:40', '15:40', '18:40', '21:40', '0:40'];
const messages = [
	'Lets get those LE',
	'Farming time 🌼',
	'Another hour of hard watering',
	'It is time!',
	'Next group in 1 hour',
	'Long wait? 😁',
];

module.exports = {
	name: 'group-announcer',
	description: 'Send updates of group',
	cron: '*/40 * * * *',
	execute: async (client, Discord) => {
		const guild = client.guilds.cache.get('879653561665986611');
		const channel = guild.channels.cache.get('879775992711876649');

		const now = new Date();
		const date = moment(now).utc().format('HH:mm');

		if (group1Hours.includes(date))
			channel.send(`<@&${'879774447211515944'}> turn. ${messages[Math.floor(Math.random() * messages.length)]}`);

		if (group2Hours.includes(date))
			channel.send(`<@&${'879774496599445544'}> turn. ${messages[Math.floor(Math.random() * messages.length)]}`);

		if (group3Hours.includes(date))
			channel.send(`<@&${'879774522801291264'}> turn. ${messages[Math.floor(Math.random() * messages.length)]}`);
	},
};
