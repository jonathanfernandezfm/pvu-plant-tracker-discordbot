const Subscription = require('../models/Subscription');

module.exports = {
	name: 'subscription-checker',
	description: 'Checks subscriptions',
	cron: '*/60 * * * *',
	execute: async (client, Discord) => {
		const subs = await Subscription.find({ time: { $lte: new Date() }, expired: false, lifetime: false });
		const guild = client.guilds.cache.get('879653561665986611');

		subs.forEach(async (sub) => {
			const userId = sub.user;
			const member = guild.members.cache.get(userId);

			// improve removal
			await member.roles.remove('879822300193652756');
			console.log(new Date(), 'Removed subscription for ' + member.user.username);
		});

		await Subscription.updateMany({ time: { $lte: new Date() }, lifetime: false }, { expired: true });
	},
};
