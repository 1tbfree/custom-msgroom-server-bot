import Client from "msgroom";
import UserAgent from 'user-agents';
const userAgent = new UserAgent();
import express from "express";
const app = express();
const port = 3000;
const client = new Client("hecker [hbot!]", "hbot!", {
    server: "wss://msgroom.goodbx.xyz",
    blockSelf: false
});

client.commands.ping = {
    description: "Replies with Pong!",
    handler    : () => "Pong!",
};
client.commands.randomuseragent = {
    description: "Random user agent",
    handler    : () => {
client.sendMessage(userAgent.toString());
    }
}
client.commands.nodifyadmin = {
    description: "Nodify admin. works like that: hbot!nodifyadmin why you want to nodify",
    handler    : (context, ...args) => {
        console.log(args.join())
        client.sendMessage("Done! Nodified admin: " + args.join(" "))
    },
}
client.commands.httprequest = {
    description: "Sends a HTTP request to a given URL. works like that: hbot!httprequest url",
    handler    : async (context, ...args) => {
        const url = args.join(" ");
        if (!url) {
            context.reply("Please provide a URL.");
            return;
        }
        try {
            const response = await fetch(url);
            const text = await response.text();
            context.reply(`Response from ${url}:\n${text}`);
        } catch (error) {
            console.error(error);
            context.reply("An error occurred while sending the request.");
        }
    },
};
client.commands.repeat = {
    description: "Repeats what you said.",
    handler    : (context, ...args) => {
        context.reply(args.join(" "));
    },
};
client.commands.runkit = {
  description: "Runs a command on RunKit. Example: hbot!runkit echo Hello",
  handler: async (context, ...args) => {
    const command = args.join(" ");
    if (!command) {
      context.reply("Please provide a command.");
      return;
    }
    try {
      const response = await fetch(`https://is2fu38zpee4.runkit.sh/run?command=${encodeURIComponent(command)}`);
      const text = await response.text();
      context.reply(`RunKit Output:\n${text}`);
    } catch (error) {
      console.error(error);
      context.reply("An error occurred while running the command on RunKit.");
    }
  },
};
client.commands.checkbotusername = {
    description: "checks user name of bot",
    handler    : () => client.name
}
await client.connect();

app.get("/sendmessage", (req, res) => {
    client.sendMessage(req.query.message)
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});