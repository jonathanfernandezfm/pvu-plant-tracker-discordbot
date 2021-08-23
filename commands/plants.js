const Plant = require('../models/Plant');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'plants',
	description: 'Return recent plants',
	help: '!plants',
	execute: async (msg, args, client, Discord) => {
		await Plant.deleteMany({ time: { $lte: new Date() } }, null);

		const plants = await Plant.find({ time: { $gte: new Date() } }, null, { sort: { time: -1 }, limit: 10 });

		const exampleEmbed = new MessageEmbed()
			.setColor('#ffff22')
			.setTitle('Plants')
			.setThumbnail('https://pvuresources.s3.ap-southeast-2.amazonaws.com/icon/plant/2_1.png')
			.setTimestamp()
			.setFooter(
				'Siguientes 10 plantas a cultivar',
				'https://www.mmoingame.com/wp-content/uploads/2021/07/Plant-vs-Undead.jpg'
			);

		plants.reverse().forEach((plant) => {
			const dateEnds = new Date(plant.time);
			const dateNow = new Date();

			exampleEmbed.addField(
				moment(plant.time).format('HH:MM:SS -- DD/MM'),
				((dateEnds.getTime() - dateNow.getTime()) / 60000).toFixed(2) + ' min - [Link](' + plant.url + ')'
			);
		});

		msg.reply(exampleEmbed);
	},
};
