const { MessageEmbed } = require("discord.js")
const moment = require("moment");

module.exports = {
    create: (sub, member) => {
        if(!sub) {
            const embedNoSub = new MessageEmbed()
                .setTitle(`No subscription active for ${member.user.username}`)
                .setThumbnail(member.user.displayAvatarURL())
                .setColor('#ff2222')
                .setAuthor(
                    'PvU Plant Tracker',
                    'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png'
                )
                .setTimestamp();

            return embedNoSub;
        }

        const embedSub = new MessageEmbed()
			.setTitle(`Subscription for ${member.user.username}`)
            .setThumbnail(member.user.displayAvatarURL())
			.setColor('#ff22ff')
			.setAuthor(
				'PvU Plant Tracker',
				'https://cryptoshitcompra.com/wp-content/uploads/2021/07/pvufarm-850x550.png'
			)
            .addField("Time", moment(sub.time).format('HH:mm:ss - DD/MM'))
            .addField("Lifetime", sub.lifetime ? "✅":"❌", true)
            .addField("Expired", sub.expired ? "✅":"❌", true)
			.setTimestamp();
    
        return embedSub;
    },
}