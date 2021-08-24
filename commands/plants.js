const Plant = require('../models/Plant');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'plants',
	description: 'Return recent plants',
	permissions: ['ADMINISTRATOR'],
	help: '!plants',
	execute: async (msg, args, client, Discord) => {
		await Plant.deleteMany({ time: { $lte: new Date() } }, null);
		const plants = await Plant.find({ time: { $gte: new Date() } }, null, { sort: { time: 1 }, limit: 8 });

		const exampleEmbed = new MessageEmbed()
			.setColor('#ffff22')
			.setAuthor(
				'Plants',
				'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png',
				'https://marketplace.plantvsundead.com/farm#/farm'
			)
			.setThumbnail('https://pvu-plants-tracker.herokuapp.com/images/logo-3.png')
			.setTimestamp()
			.setFooter(
				'Siguientes 8 plantas a cultivar',
				'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png'
			);

		plants.forEach((plant) => {
			const dateEnds = new Date(plant.time);
			const dateNow = new Date();

			exampleEmbed.addField('📅 Fecha y hora', moment(plant.time).utc().format('HH:mm:ss - DD/MM'), true);
			exampleEmbed.addField(
				'⏰ Restante',
				((dateEnds.getTime() - dateNow.getTime()) / 60000).toFixed(2) + ' min',
				true
			);
			exampleEmbed.addField('📎 Enlace', '[Planta](' + plant.url + ')', true);
		});

		msg.reply(exampleEmbed);
	},
};
