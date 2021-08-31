const Subscription = require('../models/Subscription');
const subscriptionEmbed = require('../embeds/subscription');

module.exports = {
	name: 'sub',
	description: 'Get subscription info',
	cooldown: 120,
	help: '!sub',
	execute: async (msg, args, client, Discord) => {
		const userId = msg.author.id;
		const guild = client.guilds.cache.get('879653561665986611');
		const member = guild.members.cache.get(userId);

		const userSub = await Subscription.findOne({ user: userId });
		return msg.channel.send(subscriptionEmbed.create(userSub, member));
	},
};
