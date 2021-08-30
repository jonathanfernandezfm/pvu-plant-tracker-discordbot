const Subscription = require("../models/Subscription");
const moment = require("moment");
const subscriptionEmbed = require("../embeds/subscription");

module.exports = {
	name: 'subscription',
	description: 'Manage subscriptions',
	permissions: ['ADMINISTRATOR'],
	aliases: ['sub'],
	help: '!subscription',
	execute: async (msg, args, client, Discord) => {
        const mentions = msg.mentions.members;
        if(mentions.length > 1) return msg.reply("tag only one user")
        if(mentions.length === 0) return msg.reply("tag a user")
		const user = mentions.first();
        
		const userSub = await Subscription.findOne({user: user.id});
		
		// GET SUB
		if(args.length < 2)	return msg.channel.send(subscriptionEmbed.create(userSub, user));
		
		// REMOVE SUB
		if(args[1] === "0") {
			await Subscription.deleteOne({user: user.id});
			user.roles.remove("879822300193652756");
			return msg.reply(`sub for ${user.user.username} removed`)
		}

		// UPDATE SUB
        if(userSub) {
			let time = moment(userSub.time);

			if(args[1].includes("+")) 
				time.add(args[1], "days");
			else if(args[1].includes("-")) 
				time.subtract(args[1].replace("-", ""), "days");
			else 
				time = moment().utc().add(args[1], "days");

			userSub.time = time;
			userSub.expired = false;
			await userSub.save();
			user.roles.add("879822300193652756");

			return msg.channel.send(subscriptionEmbed.create(userSub, user));
        }
		
		// CREATE SUB 
		const time = moment().utc().add(args[1], "days");
        const sub = new Subscription({user: user.id, time: time})
		await sub.save();
		user.roles.add("879822300193652756");

		return msg.channel.send(subscriptionEmbed.create(sub, user));
	},
};
