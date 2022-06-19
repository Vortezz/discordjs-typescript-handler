import { Awaitable, ClientEvents } from "discord.js";
import Bot from "./Bot";
import { EventConfig } from "./ClientEventConfig";

export abstract class Event {
    public name: keyof ClientEvents;
    public type: boolean;
    public abstract client: Bot;

    protected constructor(options: EventConfig) {
        this.name = options.name;
        this.type = options.type;
    }

    public abstract run(...args: any[]): Awaitable<void> | PromiseLike<void>;
}