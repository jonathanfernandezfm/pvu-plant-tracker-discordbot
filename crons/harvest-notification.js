const Plant = require('../models/Plant');
const User = require('../models/User');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

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
				const embedPlant = new MessageEmbed()
					.setColor('#ffff22')
					.setTitle('🌱 Plant is almost ready to harvest!')
					.setAuthor(
						'PvU Plant Tracker',
						'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png'
					)
					.addField('Id', plant.id_plant)
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
						'Remember! harvest times can delay due to PvU servers',
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

				await member.send(embedPlant);

				const updated = await Plant.updateOne(
					{ id_plant: plant.id_plant },
					{ notified_harvest: true },
					{ new: true }
				);
			}
		});
	},
};
