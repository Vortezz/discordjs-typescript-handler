
import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction, Message, MessageInteraction, PermissionResolvable} from "discord.js";
import Bot from "./Bot";
import {CommandConfig} from "./CommandConfig";

export abstract class Command {
    public name: string;
    public usage: string;
    public category: string;
    public desc: string;
    public ownerOnly: boolean;
    public userPermission: PermissionResolvable[];
    public slashBuilder: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    public abstract client: Bot;

    protected constructor(options: CommandConfig) {
        this.name = options.name;
        this.usage = options.usage;
        this.category = options.category;
        this.desc = options.desc;
        this.ownerOnly = options.ownerOnly;
        this.userPermission = options.userPermission;
        this.slashBuilder = options.slashBuilder;
    }

    public abstract run(message: Message, args: string[]): unknown | Promise<unknown>;

    public abstract interact(interaction: CommandInteraction): unknown | Promise<unknown>;
}