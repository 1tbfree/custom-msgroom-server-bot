import Client from "msgroom";
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
