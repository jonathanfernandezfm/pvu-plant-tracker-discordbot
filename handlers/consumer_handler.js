const fs = require('fs');

module.exports = (client, Discord) => {
	const consumer_files = fs.readdirSync('./consumers/').filter((file) => file.endsWith('.js'));

	for (const file of consumer_files) {
		const consumer = require(`../consumers/${file}`);

		if (consumer.channel) client.consumers.set(consumer.channel, consumer);
	}
};
