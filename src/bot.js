require("dotenv").config();
const { Client } = require("discord.js");

const PREFIX = "$";
const client = new Client();

client.on("ready", () => {
    console.log(`${client.user.username} has logged in`);
});

client.on("message", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/); // REGEX to prevent duplicate spaces

        if (CMD_NAME === "kick") {
            if (!message.member.hasPermission("KICK_MEMBERS")) {
                return message.reply(
                    "You do not have the permission to use that command."
                );
            }

            if (args.length === 0) return message.reply("Please provide an ID");

            const member = message.guild.members.cache.get(args[0]);

            if (member) {
                member
                    .kick()
                    .then((member) =>
                        message.channel.send(`${member} has been kicked!`)
                    )
                    .catch((err) =>
                        message.reply("I cannot kick the user! :(")
                    );
            } else {
                message.channel.send("Member was not found!");
            }
        } else if (CMD_NAME === "ban") {
            if (!message.member.hasPermission("BAN_MEMBERS")) {
                return message.reply(
                    "You do not have the permission to use that command."
                );
            }

            if (args.length === 0) return message.reply("Please provide an ID");

            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send("User was banned successfully!");
            } catch (err) {
                message.channel.send(
                    "An error occured, Either I do not have a permission or user not found!"
                );
            }
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
