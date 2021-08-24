module.exports = (Discord, client) => {
	console.log('Bot is online!');

	client.user
		.setActivity('PvU', {
			type: 'PLAYING',
		})
		.catch(console.error);
};
