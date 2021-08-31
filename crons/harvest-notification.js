const Plant = require('../models/Plant');
const User = require('../models/User');
const plantsEmbed = require('../embeds/plants');

module.exports = {
	name: 'harvest-notification',
	description: 'Send next harvestable plant to owner',
	cron: '*/1 * * * *',
	execute: async (client, Discord) => {
		const plants = await Plant.find({ harvest_time: { $gte: new Date() }, notified_harvest: null }, null, {
			sort: { harvest_time: 1 },
			limit: 10,
		});

		const guild = client.guilds.cache.get('879653561665986611');

		console.log(plants);

		plants.forEach(async (plant) => {
			if (!plant.owner) return;
			const user = await User.findOne({ wallet: plant.owner });
			if (!user) return;
			const member = guild.members.cache.get(user.user);

			const dateEnds = new Date(plant.harvest_time);
			const dateNow = new Date();

			if (dateEnds.getTime() - dateNow.getTime() < 180000) {
				await member.send(plantsEmbed.harvest(plant));

				const updated = await Plant.updateOne(
					{ id_plant: plant.id_plant },
					{ notified_harvest: true },
					{ new: true }
				);
			}
		});
	},
};
