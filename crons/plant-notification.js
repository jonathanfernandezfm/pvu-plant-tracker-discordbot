const Plant = require('../models/Plant');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

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
		// console.log(plants);

		plants.forEach(async (plant) => {
			const dateEnds = new Date(plant.time);
			const dateNow = new Date();

			if (dateEnds.getTime() - dateNow.getTime() < 180000) {
				const embedPlant = new MessageEmbed()
					.setColor('#ffff22')

					.setAuthor(
						'PvU Plant Tracker',
						'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png'
					)
					.addField('Id', plant.id_plant)
					// .addField('Land', '[Click here](' + plant.url + ')')
					.addField('Plant', '[Click here](' + plant.url + ')')
					.addField('Coordinates', `${plant.coordinate_x} ${plant.coordinate_y}`)
					.addField(
						'Time left',
						`${((dateEnds.getTime() - dateNow.getTime()) / 60000).toFixed(2)} min (${moment(plant.time)
							.utc()
							.format('HH:mm:ss')} UTC)`
					)
					.setTimestamp()
					.setFooter(
						'Remember! reset times can delay up to a couple of mins',
						'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png'
					);

				if (plant.image && plant.image.includes('http')) {
					embedPlant.setThumbnail(plant.image);
					if (plant.image.includes('sapling.svg')) {
						embedPlant.setThumbnail('https://pvu-plants-tracker.herokuapp.com/images/sapling.png');
					}

					if (plant.image.includes('mama.svg')) {
						embedPlant.setThumbnail('https://pvu-plants-tracker.herokuapp.com/images/mama.png');
					}
				} else {
					embedPlant.setThumbnail('https://pvu-plants-tracker.herokuapp.com/images/sapling.png');
				}

				await channel.send(embedPlant);

				const updated = await Plant.updateOne({ id_plant: plant.id_plant }, { notified: true }, { new: true });
				// console.log(updated, 'less than 5 min plant');
			} else {
				// console.log('more than 5 min plant');
			}
		});
	},
};
