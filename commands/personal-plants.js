const User = require('../models/User');
const moment = require('moment');
const plantsEmbed = require('../embeds/plants');

const plantUrl = 'https://marketplace.plantvsundead.com/#/farm/';

module.exports = {
	name: 'personal-plants',
	description: 'Return a list of personal plants to analize',
	permissions: ['ADMINISTRATOR'],
	help: '!personal-plants',
	execute: async (msg, args, client, Discord) => {
		const users = await User.find({ 'plants.time': { $lte: new Date() } });

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

		msg.channel.send(plantsEmbed.toAnalize(arrayOfUrls));

		console.log(users);
		console.log(arrayOfUrls);
	},
};
