const Plant = require('../models/Plant');
const plantsEmbed = require('../embeds/plants');

module.exports = {
	name: 'plant-notification',
	description: 'Send next resetting plant',
	cron: '*/1 * * * *',
	execute: async (client, Discord) => {
		await Plant.deleteMany({ time: { $lte: new Date() } }, null);

		const guild = client.guilds.cache.get('879653561665986611');
		const channel = guild.channels.cache.get('879655025536827392');

		const plants = await Plant.find({ time: { $gte: new Date() }, notified: null }, null, {
			sort: { time: 1 },
			limit: 10,
		});

		plants.forEach(async (plant) => {
			const dateEnds = new Date(plant.time);
			const dateNow = new Date();

			if (dateEnds.getTime() - dateNow.getTime() < 180000) {
				await channel.send(plantsEmbed.plantNotification(plant));
				const updated = await Plant.updateOne({ id_plant: plant.id_plant }, { notified: true }, { new: true });
			}
		});
	},
};
