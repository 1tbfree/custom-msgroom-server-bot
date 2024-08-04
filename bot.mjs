import Client from "msgroom";
import express from "express";
const app = express();
const port = 3000;
const client = new Client("hecker [hbot!]", "hbot!", {
    server: "wss://msgroom.goodbx.xyz" 
});

client.commands.ping = {
    description: "Replies with Pong!",
    handler    : () => "Pong!",
};

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
client.connect();

app.get("/sendwelcome", (req, res) => {
    client.sendMessage("hi guys i opened some random link"); // <-- Missing opening curly brace here
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});