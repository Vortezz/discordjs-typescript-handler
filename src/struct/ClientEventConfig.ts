import { ClientEvents } from "discord.js";

export interface EventConfig {
    name: keyof ClientEvents,
    type: boolean,
}