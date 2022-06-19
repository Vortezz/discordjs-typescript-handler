import registerCommands from "../loaders/registerCommands";
import { Event } from "../struct/ClientEvent";
import colors from "colors"

abstract class Ready extends Event {

    protected constructor() {
        super({
            name: "ready",
            type: true,
        })
    }

    run() {
        if (!this.client.user || !this.client.application) {
            return;
        }

        console.log(colors.yellow(`Registering commands...`))
        registerCommands(this.client);
        this.client.sucess(`Commands loaded !`)

        this.client.sucess(`${this.client.user.username} is online !`);

        this.client.user.setStatus("dnd");
        this.client.user.setActivity(`to something :D`);

        let client = this.client;
    }

}

export default Ready;