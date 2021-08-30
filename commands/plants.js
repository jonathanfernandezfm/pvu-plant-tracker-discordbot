const Plant = require('../models/Plant');
const plantsEmbed = require('../embeds/plants');

module.exports = {
	name: 'plants',
	description: 'Return recent plants',
	permissions: ['ADMINISTRATOR'],
	help: '!plants',
	execute: async (msg, args, client, Discord) => {
		await Plant.deleteMany({ time: { $lte: new Date() } }, null);
		const plants = await Plant.find({ time: { $gte: new Date() } }, null, { sort: { time: 1 }, limit: 8 });

		msg.reply(plantsEmbed.recent(plants));
	},
};
