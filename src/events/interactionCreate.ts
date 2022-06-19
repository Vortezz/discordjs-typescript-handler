import {Interaction} from "discord.js";
import reject from "../qresponses/reject";
import {CommandOptions} from "../struct/CommandConfig";
import {Event} from "../struct/ClientEvent";

abstract class MessageCreate extends Event {

    protected constructor() {
        super({
            name: "interactionCreate",
            type: false,
        })
    }

    run(interaction: Interaction) {
        if (interaction == null || interaction.guild == null || interaction.user == null) {
            return;
        }

        if (!interaction.isChatInputCommand()) {
            return;
        }

        const commandName: string | undefined = interaction.commandName;
        if (!commandName) {
            return;
        }
        if (this.client.commands.has(commandName)) {
            const command: CommandOptions | undefined = this.client.commands.get(commandName);
            if (!command) {
                return;
            }
            if (command.ownerOnly && !this.client.config.OWNERS.find(value => value == interaction.user.id)) {
                reject(interaction, `Sorry but that command is owner only...`)
                return;
            }

            for (let i = 0; i < command.userPermission.length; i++) {
                if (!interaction.member?.permissions) {
                    reject(interaction, `You need to have \`${command.userPermission[i]}\` permission to do that command !`)
                    return;
                }

                if (typeof interaction.member?.permissions === 'string') {
                    reject(interaction, `You need to have \`${command.userPermission[i]}\` permission to do that command !`)
                    return;
                }

                if (!interaction.member?.permissions.has(command.userPermission[i])) {
                    reject(interaction, `You need to have \`${command.userPermission[i]}\` permission to do that command !`)
                    return
                }
            }
            try {
                this.client.commands.get(commandName)?.interact(interaction);
            } catch (e) {
                this.client.warn(`Error while doing \`${commandName}\` command in \`${interaction.guild.id}\``)
            }
        }
    }

}

export default MessageCreate;