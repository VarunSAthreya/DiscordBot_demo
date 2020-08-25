# DiscordBot Demo

## A Simple Discord bot to make an Announcement or Kick/Ban a user!

Created using [Discord.JS](https://discord.js.org/#/) module

## Getting Started

### Installing Dependencies:

**`npm install`**

### Set Environment Varialbles:

**To Set `DISCORD_BOT_TOKEN` :**

-   You can create a bot by going [here](https://discord.com/developers/applications).
-   And then copy `BOT TOKEN`.

**To set `WEBHOOK_ID` & `WEBHOOK_TOKEN` :**

-   You can create a webhook to a channel in a server by going to it's `settings -> integrations`.
-   There you can craete webhook then `COPY WEBHOOK URL`.
-   The link would look like **https://discord.com/api/webhooks/`WEBHOOK_ID`/`WEBHOOK_TOKEN`**.
-   Copy the `ID` and `TOKEN`.

### To Start the server:

**`npm start`**

## Available Commands:

**`$kick`**

-   Used to kick users out of server. (User must be present in server).
-   Syntax: `$kick "user_id"`.
-   The User & Bot must have the permission to kick the users.

**`$ban`**

-   Used to ban users. (Users not in server can also be banned).
-   Syntax: `$ban "user_id"`.
-   The User & Bot must have the permission to ban the users.

**`$announce`**

-   Announces the given message with @everyone.
-   Syntax: `$announce "message"`.
-   No permission requried.
