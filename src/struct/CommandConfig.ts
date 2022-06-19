
import {SlashCommandBuilder} from "@discordjs/builders";
import {PermissionResolvable, Message, MessageInteraction, CommandInteraction} from "discord.js";
import Bot from "./Bot";

export interface CommandOptions {
    name: string;
    usage: string,
    category: string,
    desc: string,
    ownerOnly: boolean,
    userPermission: PermissionResolvable[],
    slashBuilder: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    run: (message: Message, args: string[]) => unknown | Promise<unknown>,
    interact: (interaction: CommandInteraction) => unknown | Promise<unknown>,
}

export type CommandConfig = Omit<CommandOptions, 'run' | 'interact'>;