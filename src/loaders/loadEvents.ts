import { readdirSync } from "fs";
import Bot from "../struct/Bot";
import { Event } from "../struct/ClientEvent";


const loadEvents = (client: Bot) => {
    readdirSync("src/events/").forEach(eventFileName => {
        delete require.cache[require.resolve(`../events/${eventFileName}`)];
        const eventFile = require(`../events/${eventFileName}`).default;
        if (eventFile.prototype instanceof Event) {
            const event: Event = new eventFile;
            event.client = client;
            client[event.type ? "once" : "on"](event.name, (...args: any) => event.run(...args));
        }
    })
}

export default loadEvents;