import Client from "msgroom";
const client = new Client("TestBot", "!", {
    server: "wss://msgroom.goodbx.xyz" 
});

// insert some very cool commands here

await client.connect();
