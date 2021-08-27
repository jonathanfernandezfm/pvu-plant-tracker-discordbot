module.exports = {
	name: 'group-announcer',
	description: 'Send updates of group',
	cron: '*/60 * * * *',
	execute: async (client, Discord) => {
		const guild = client.guilds.cache.get('879653561665986611');
		const channel = guild.channels.cache.get('880366796216082444');

		const memberCount = guild.memberCount;
		channel.setName(`🌾 | Gardeners: ${memberCount}`).catch((err) => {
			console.log(err);
		});
	},
};
