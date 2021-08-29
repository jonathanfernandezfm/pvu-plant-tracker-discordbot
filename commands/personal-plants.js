const User = require('../models/User');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const plantUrl = 'https://marketplace.plantvsundead.com/#/farm/';

module.exports = {
	name: 'personal-plants',
	description: 'Return a list of personal plants to analize',
	permissions: ['ADMINISTRATOR'],
	help: '!personal-plants',
	execute: async (msg, args, client, Discord) => {
		const users = await User.find({ 'plants.time': { $lte: new Date() } });

		console.log(users);

		const arrayOfUrls = [];
		users.forEach((user) => {
			user.plants.forEach((plant) => {
				const dateUpdated = new Date(plant.time);
				const dateNow = new Date();

				if (dateNow.getTime() - dateUpdated.getTime() > 0) {
					arrayOfUrls.push(`${plantUrl}${plant.id}`);
					plant.time = moment().add(2, 'hours');
				}
			});

			user.save();
		});

		if (!arrayOfUrls.length) return msg.reply('No plants');

		const embedPlant = new MessageEmbed()
			.setTitle('Plants to analize')
			.setColor('#22ff22')
			.setAuthor(
				'PvU Plant Tracker',
				'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png'
			)
			.setDescription(arrayOfUrls.join('\n'))
			.setTimestamp();

		msg.channel.send(embedPlant);
		console.log(arrayOfUrls);
	},
};
