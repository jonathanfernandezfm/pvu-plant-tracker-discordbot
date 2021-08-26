const Plant = require('../models/Plant');

module.exports = {
	name: 'update-presence',
	description: 'Updates presence to show total plants tracked',
	cron: '*/60 * * * *',
	execute: async (client, Discord) => {
		const count = await Plant.countDocuments();
		console.log(count);

		client.user.setPresence({
			activity: {
				name: `PvU | Watching ${count} plants grow`,
				type: 'PLAYING',
			},
		});
	},
};
