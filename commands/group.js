const moment = require('moment');

const startingGroup = 10;
const maxGroups = 12;
const startingHour = "08";
const startingMinute = "00";
const minutes = "20"

module.exports = {
	name: 'group',
	description: 'Respond with group rotation info',
	help: '!group',
	execute: async (msg, args, client, Discord) => {
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
        msg.reply(`**Group ${groupCounter}**. Next group will be in ${minutes} minutes (${moment(date).subtract(minutes, "minutes").format('HH:mm')} UTC)`)
	},
};
