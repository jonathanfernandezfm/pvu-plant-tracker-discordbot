const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const mongoose = require('./database');
const express = require('express');
const { PORT } = require('./config');
const User = require('./models/User');
const { MessageEmbed } = require('discord.js');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.consumers = new Discord.Collection();

['command_handler', 'event_handler', 'cron_handler', 'consumer_handler'].forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});

client.login(process.env.DISCORD_TOKEN);

/// SERVER
const app = express();
app.use(express.json());

app.post('/notify-crow', async (req, res) => {
	const guild = client.guilds.cache.get('879653561665986611');
	const user = await User.findOne({ wallet: req.body.owner });
	if (!user) return;

	const id_plant = req.body.id_plant;
	const url = req.body.url;

	const member = guild.members.cache.get(user.user);
	const embedPlant = new MessageEmbed()
		.setColor('#ff3333')
		.setTitle('🐥 There is a crow in your plant!')
		.setAuthor('PvU Plant Tracker', 'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png')
		.addField('Id', id_plant)
		.addField('Plant', '[Click here](' + url + ')')
		.setTimestamp()
		.setFooter('Hurry up!', 'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png')
		.setThumbnail('https://freepngimg.com/thumb/crow/4-2-crow-png.png');

	await member.send(embedPlant);
	res.status(200).json({});
});

app.post('/notify-seed', async (req, res) => {
	const guild = client.guilds.cache.get('879653561665986611');
	const user = await User.findOne({ wallet: req.body.owner });
	if (!user) return;

	const id_plant = req.body.id_plant;
	const url = req.body.url;

	const member = guild.members.cache.get(user.user);
	const embedPlant = new MessageEmbed()
		.setColor('#33ff33')
		.setTitle('🥔 There is a seed drop in your plant!')
		.setAuthor('PvU Plant Tracker', 'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png')
		.addField('Id', id_plant)
		.addField('Plant', '[Click here](' + url + ')')
		.setTimestamp()
		.setFooter('Take it!', 'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png')
		.setThumbnail(
			'https://mmoingame.com/wp-content/uploads/2021/07/plant-vs-undead-otro-juego-nft-con-el-que-poder-sacarte-un-sueldo-mensual.png'
		);

	await member.send(embedPlant);
	res.status(200).json({});
});

app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}`);
});
