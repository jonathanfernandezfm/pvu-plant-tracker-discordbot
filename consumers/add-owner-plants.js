const User = require('../models/User');
const moment = require('moment');

module.exports = {
	name: 'add-owner-plants',
	description: 'Add a plant to an owner',
	channel: '880802784021196820',
	execute: async (msg, client, Discord) => {
		if (msg.author.id === '879425715483861003') return;
		msg.delete();

		const user = await User.findOne({ user: msg.author.id });

		if (!user) {
			const response = await msg.reply(
				'You have to set up your account before adding plants. Do it with `!set-account {account}` in #commands'
			);
			setTimeout(() => {
				response.delete();
			}, 3000);
		}

		const plants = msg.content.split(/ +/);
		let ids = plants.map(async (plant) => {
			if (plant.includes('http')) {
				const urlSplitted = plant.split('/');
				return {
					id: urlSplitted[urlSplitted.length - 1],
					time: moment(),
				};
			} else if (plant.match(/^[a-f\d]{24}$/i)) {
				return {
					id: plant,
					time: moment(),
				};
			} else {
				const response = await msg.reply('Wrong format in url or id');
				setTimeout(() => {
					response.delete();
				}, 3000);
			}
		});

		if (!user.plants) user.plants = [];
		user.plants = [...new Set([...user.plants, ...ids])];
		await user.save();
	},
};
