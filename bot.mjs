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

client.commands.repeat = {
    description: "Repeats what you said.",
    handler    : (context, ...args) => {
        context.reply(args.join(" "));
    },
};
await client.connect();

app.get("/", (req, res) => {
    client.sendMessage("hi guys i opened some random link"); // <-- Missing opening curly brace here
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});