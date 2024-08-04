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