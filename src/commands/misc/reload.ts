import {CommandInteraction, Message} from "discord.js";
import reject from "../../qresponses/reject";
import success from "../../qresponses/sucess";
import {CommandOptions} from "../../struct/CommandConfig";
import {Command} from "../../struct/Command";
import {SlashCommandBuilder} from "@discordjs/builders";

abstract class ReloadCommand extends Command {

    protected constructor() {
        super({
            name: "reload",
            usage: "{prefix}reload",
            category: "misc",
            desc: "Reload a bot command !",
            ownerOnly: true,
            userPermission: [],
            slashBuilder: new SlashCommandBuilder().setName("reload")
                .setDescription("Reload a part of the BOT")
                .addStringOption(option => {
                    return option.setName("command")
                        .setDescription("Command to reload")
                        .setRequired(true);
                })
        })
    }

    run(message: Message, args: string[]) {

        if (args.length == 0) {
            reject(message, `Please give which command you want to reload !`)
            return;
        }

        if (!this.client.commands.get(args[0])) {
            reject(message, `Unknown command !`)
            return;
        }

        const commandBefore: CommandOptions | undefined = this.client.commands.get(args[0]);

        if (!commandBefore) {
            reject(message, `Unknown command !`)
            return;
        }

        delete require.cache[require.resolve(`../${commandBefore.category}/${commandBefore.name}.ts`)];
        const commandFile = require(`../${commandBefore.category}/${commandBefore.name}.ts`).default;
        if (commandFile.prototype instanceof Command) {
            const command: Command = new commandFile;
            command.client = this.client;
            this.client.commands.set(command.name, command);
            success(message, `Command \`${command.name}\` have been reloaded !`)
        }

    }

    interact(interaction: CommandInteraction) {
        if (!interaction.options.get("command")) {
            reject(interaction, `Please give which command you want to reload !`)
            return;
        }

        if (!this.client.commands.get(interaction.options.get("command")?.value as string)) {
            reject(interaction, `Unknown command !`)
            return;
        }

        const commandBefore: CommandOptions | undefined = this.client.commands.get(interaction.options.get("command")?.value as string);

        if (!commandBefore) {
            reject(interaction, `Unknown command !`)
            return;
        }

        delete require.cache[require.resolve(`../${commandBefore.category}/${commandBefore.name}.ts`)];
        const commandFile = require(`../${commandBefore.category}/${commandBefore.name}.ts`).default;
        if (commandFile.prototype instanceof Command) {
            const command: Command = new commandFile;
            command.client = this.client;
            this.client.commands.set(command.name, command);
            success(interaction, `Command \`${command.name}\` have been reloaded !`)
        }

    }

}

export default ReloadCommand;
