const User = require('../models/User');

module.exports = {
	name: 'account',
	description: 'Set up account for a user',
	aliases: ['wallet'],
	cooldown: 120,
	help: '!account',
	execute: async (msg, args, client, Discord) => {
		if (args.length == 0) return msg.channel.send('Correct format `!set-account {wallet}`');

		const account = args[0];

		const userUpdated = await User.findOneAndUpdate({ user: msg.author.id }, { wallet: account });

		if (!userUpdated) {
			const user = new User({ user: msg.author.id, wallet: account });
			await user.save();
		}

		msg.reply(`Account \`${account}\` saved`);
	},
};
