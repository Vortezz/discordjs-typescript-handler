import { Message } from "discord.js";
import reject from "../qresponses/reject";
import { CommandOptions } from "../struct/CommandConfig";
import { Event } from "../struct/ClientEvent";

abstract class MessageCreate extends Event {

    protected constructor() {
        super({
            name: "messageCreate",
            type: false,
        })
    }

    run(message: Message) {
        if (message == null || message.guild == null || message.author == null) {
            return;
        }
        const prefix = this.client.config.PREFIX;
        if (message.content.startsWith(prefix)) {
            const content: string = message.content.slice(1)
            const args: string[] = content.split(" ");
            const commandName: string | undefined = args.shift();
            if (!commandName) { return; }
            if (this.client.commands.has(commandName)) {
                const command: CommandOptions | undefined = this.client.commands.get(commandName);
                if (!command) {
                    return;
                }
                if (command.ownerOnly && !this.client.config.OWNERS.find(value => value == message.author.id)) {
                    reject(message, `Sorry but that command is owner only...`)
                    return;
                }
                for (let i = 0; i < command.userPermission.length; i++) {
                    if (!message.member?.permissions.has(command.userPermission[i])) {
                        reject(message, `You need to have \`${command.userPermission[i]}\` permission to do that command !`)
                        return
                    }
                }
                try {
                    this.client.commands.get(commandName)?.run(message, args);
                } catch (e) {
                    this.client.warn(`Error while doing \`${args[0]}\` command in \`${message.guild.id}\``)
                }
            }
        }
    }

}

export default MessageCreate;