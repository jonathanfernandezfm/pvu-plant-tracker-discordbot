const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	toAnalize: (arrayOfUrls) => {
		const embedPlant = new MessageEmbed()
			.setTitle('Plants to analize')
			.setColor('#22ff22')
			.setAuthor(
				'PvU Plant Tracker',
				'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png'
			)
			.setDescription(arrayOfUrls.join('\n'))
			.setTimestamp();

		return embedPlant;
	},
	recent: (plants) => {
		const recentEmbed = new MessageEmbed()
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

			recentEmbed.addField('📅 Fecha y hora', moment(plant.time).utc().format('HH:mm:ss - DD/MM'), true);
			recentEmbed.addField(
				'⏰ Restante',
				((dateEnds.getTime() - dateNow.getTime()) / 60000).toFixed(2) + ' min',
				true
			);
			recentEmbed.addField('📎 Enlace', '[Planta](' + plant.url + ')', true);
		});

		return recentEmbed;
	},
	harvest: (plant) => {
		const dateEnds = new Date(plant.harvest_time);
		const dateNow = new Date();

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

		return embedPlant;
	},
	plantNotification: (plant) => {
		const dateEnds = new Date(plant.time);
		const dateNow = new Date();

		const embedPlant = new MessageEmbed()
			.setColor('#ffff22')
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

		return embedPlant;
	},
	crow: (plant) => {
		const embedPlant = new MessageEmbed()
			.setColor('#ff3333')
			.setTitle('🐥 There is a crow in your plant!')
			.setAuthor(
				'PvU Plant Tracker',
				'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png'
			)
			.addField('Id', plant.id_plant)
			.addField('Plant', '[Click here](' + plant.url + ')')
			.setTimestamp()
			.setFooter('Hurry up!', 'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png')
			.setThumbnail('https://freepngimg.com/thumb/crow/4-2-crow-png.png');

		return embedPlant;
	},
	seed: (plant) => {
		const embedPlant = new MessageEmbed()
			.setColor('#33ff33')
			.setTitle('🥔 There is a seed drop in your plant!')
			.setAuthor(
				'PvU Plant Tracker',
				'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png'
			)
			.addField('Id', plant.id_plant)
			.addField('Plant', '[Click here](' + plant.url + ')')
			.setTimestamp()
			.setFooter('Take it!', 'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png')
			.setThumbnail(
				'https://mmoingame.com/wp-content/uploads/2021/07/plant-vs-undead-otro-juego-nft-con-el-que-poder-sacarte-un-sueldo-mensual.png'
			);

		return embedPlant;
	},
};
