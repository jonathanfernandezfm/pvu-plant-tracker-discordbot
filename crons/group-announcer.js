const moment = require('moment');

const startingGroup = 10;
const maxGroups = 12;
const startingHour = "08";
const startingMinute = "00";
const minutes = "20"

const messages = [
	'Lets get those LE',
	'Farming time 🌼',
	'Another hour of hard watering! 💦',
	'It is time to farm!',
	'Long wait? 😁',
	'Please, no lag :('
];

module.exports = {
	name: 'group-announcer',
	description: 'Send updates of group',
	cron: `*/${minutes} * * * *`,
	execute: async (client, Discord) => {
		const guild = client.guilds.cache.get('879653561665986611');
		const channel = guild.channels.cache.get('879843545165471784');

		const date = moment().utc().hour(startingHour).minute(startingMinute);
        const now = moment().utc();
        if(date.isAfter(now)) date.subtract(1, "day")

        let found = false;
        let groupCounter = startingGroup;

        do {
            if(date.isAfter(now)) found = true;
            else {
                groupCounter++;
                date.add(minutes, "minutes");
                if(groupCounter > maxGroups) groupCounter = 1;
            } 
        } while (!found)

        groupCounter = (groupCounter-1) === 0 ? 12 : groupCounter - 1;

		return await channel.send(
			`:arrow_forward: **Group ${groupCounter}** turn. ${messages[Math.floor(Math.random() * messages.length)]}\nNext group will be in ${minutes} minutes (${moment(date).subtract(minutes, "minutes").format('HH:mm')} UTC)`
		);
	},
};
