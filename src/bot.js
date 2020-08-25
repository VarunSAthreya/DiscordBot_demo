require("dotenv").config();
const { Client, WebhookClient } = require("discord.js");

const PREFIX = "$";
const client = new Client();

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN
);

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

        switch (CMD_NAME) {
            case "kick": {
                if (!message.member.hasPermission("KICK_MEMBERS")) {
                    return message.reply(
                        "You do not have the permission to use that command."
                    );
                }

                if (args.length === 0)
                    return message.reply("Please provide an ID");

                const member = message.guild.members.cache.get(args[0]);

                if (member) {
                    try {
                        const user = await member.kick();
                        message.channel.send(`${user} has been kicked!`);
                    } catch (err) {
                        console.log(err);
                        message.reply("I cannot kick the user! :(");
                    }
                } else {
                    message.channel.send("Member was not found!");
                }

                break;
            }
            case "ban": {
                if (!message.member.hasPermission("BAN_MEMBERS")) {
                    return message.reply(
                        "You do not have the permission to use that command."
                    );
                }

                if (args.length === 0)
                    return message.reply("Please provide an ID");

                try {
                    const user = await message.guild.members.ban(args[0]);
                    message.channel.send(`${user} was banned successfully!`);
                } catch (err) {
                    message.channel.send(
                        "An error occured, Either I do not have a permission or user not found!"
                    );
                }
                break;
            }

            case "mute": {
                if (!message.member.hasPermission("MANAGE_ROLES")) {
                    return message.reply(
                        "You do not have the permission to use that command."
                    );
                }

                if (args.length === 0)
                    return message.reply("Please provide an ID");

                let tomute = message.guild.member(
                    message.mentions.users.first() ||
                        message.guild.members.cache.get(args[0])
                );

                if (!tomute) return message.reply("Couldn't find user.");

                if (tomute.hasPermission("MANAGE_MESSAGES"))
                    return message.reply("Can't mute them!");

                let muterole = message.guild.roles.find(
                    (muterole) => muterole.name === "muted"
                );

                if (!muterole) {
                    try {
                        muterole = await message.guild.createRole({
                            name: "muted",
                            color: "#000000",
                            permissions: [],
                        });
                        message.guild.channels.forEach(async (channel, id) => {
                            await channel.overwritePermissions(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false,
                            });
                        });
                    } catch (e) {
                        console.log(e.stack);
                    }
                }

                let mutetime = args[1];
                if (!mutetime)
                    return message.reply("You didn't specify a time!");

                await tomute.addRole(muterole.id);
                message.reply(
                    `<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`
                );

                setTimeout(function () {
                    tomute.removeRole(muterole.id);
                    message.channel.send(`<@${tomute.id}> has been unmuted!`);
                }, ms(mutetime));

                break;
            }
            case "announce": {
                const msg = args.join(" ");
                webhookClient.send(`@everyone \n${msg}`);
                break;
            }
            default:
                message.reply("Invalid Command!");
                break;
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
