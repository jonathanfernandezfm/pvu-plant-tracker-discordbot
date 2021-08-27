const axios = require('axios');

module.exports = {
	name: 'pvu-price',
	description: 'PvU price tracker',
	cron: '*/10 * * * *',
	execute: async (client, Discord) => {
		const guild = client.guilds.cache.get('879653561665986611');
		const channel = guild.channels.cache.get('880758177350713356');

		try {
			const response = await axios.get(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=plant-vs-undead-token'
			);
			const price = response.data[0].current_price;
			const change = response.data[0].price_change_percentage_24h;

			return channel.setName(`asd | ${price}$ (${change.toFixed(2)}%)`).catch((err) => {
				console.log(err);
			});
		} catch (err) {
			console.log(err);
		}
	},
};
