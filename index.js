const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const mongoose = require('./database');
const express = require('express');
const { PORT } = require('./config');
const User = require('./models/User');
const plantsEmbed = require('./embeds/plants');

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

	const member = guild.members.cache.get(user.user);
	await member.send(plantsEmbed.crow(req.body));

	res.status(200).json({});
});

app.post('/notify-seed', async (req, res) => {
	const guild = client.guilds.cache.get('879653561665986611');
	const user = await User.findOne({ wallet: req.body.owner });
	if (!user) return;

	const member = guild.members.cache.get(user.user);
	await member.send(plantsEmbed.seed(req.body));

	res.status(200).json({});
});

app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}`);
});
