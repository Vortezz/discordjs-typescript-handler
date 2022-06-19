import {Colors, CommandInteraction, EmbedBuilder, Message} from "discord.js";
import {Command} from "../../struct/Command";
import {SlashCommandBuilder} from "@discordjs/builders";

abstract class PingCommand extends Command {

    protected constructor() {
        super({
            name: "ping",
            usage: "{prefix}ping",
            category: "misc",
            desc: "Get bot's ping !",
            ownerOnly: false,
            userPermission: [],
            slashBuilder: new SlashCommandBuilder().setName("ping").setDescription("Get the bot's ping")
        })
    }

    run(message: Message, args: string[]) {
        const replyEmbed: EmbedBuilder = new EmbedBuilder()
            .setDescription(`${this.client.user?.username} : ${Date.now() - message.createdTimestamp}ms\nAPI : ${Math.round(this.client.ws.ping)}ms`)
            .setColor(Colors.Green)
            .setTimestamp(Date.now())
            .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL({forceStatic: false})})

        message.reply({embeds: [replyEmbed]})
    }

    interact(interaction: CommandInteraction) {
        const replyEmbed: EmbedBuilder = new EmbedBuilder()
            .setDescription(`${this.client.user?.username} : ${Date.now() - interaction.createdTimestamp}ms\nAPI : ${Math.round(this.client.ws.ping)}ms`)
            .setColor(Colors.Green)
            .setTimestamp(Date.now())
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({forceStatic: false})
            })
        interaction.reply({embeds: [replyEmbed]})
    }

}

export default PingCommand;