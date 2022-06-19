import {
    Colors,
    CommandInteraction,
    EmbedBuilder,
    Message
} from "discord.js";
import {Command} from "../../struct/Command";
import {CommandConfig} from "../../struct/CommandConfig";
import {SlashCommandBuilder} from "@discordjs/builders";

abstract class PingCommand extends Command {

    protected constructor() {
        super({
            name: "help",
            usage: "{prefix}help",
            category: "misc",
            desc: "Get bot's help !",
            ownerOnly: false,
            userPermission: [],
            slashBuilder: new SlashCommandBuilder().setName("help").setDescription("Get the bot's help menu")
        })
    }

    run(message: Message, args: string[]) {

        let helpText: string = "";

        this.client.categories.forEach(category => {
            if (helpText == "") {
                helpText += `**${category.emoji} ${category?.name}**\n`
            } else {
                helpText += `\n**${category.emoji} ${category?.name}**\n`
            }
            let commandsText = ""
            category.commands.forEach(commandName => {
                const command: CommandConfig | undefined = this.client.commands.get(commandName);
                if (commandsText == "") {
                    commandsText += `\`${command?.name}\``
                } else {
                    commandsText += `, \`${command?.name}\``
                }
            })
            helpText += commandsText;
        })

        const replyEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`${this.client.user?.username} help menu :`)
            .setDescription(helpText)
            .setColor(Colors.Blurple)
            .setTimestamp(Date.now())
            .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL({forceStatic: false})})

        message.reply({embeds: [replyEmbed]})
    }

    interact(interaction: CommandInteraction) {

        let helpText: string = "";

        this.client.categories.forEach(category => {
            if (helpText == "") {
                helpText += `**${category.emoji} ${category?.name}**\n`
            } else {
                helpText += `\n**${category.emoji} ${category?.name}**\n`
            }
            let commandsText = ""
            category.commands.forEach(commandName => {
                const command: CommandConfig | undefined = this.client.commands.get(commandName);
                if (commandsText == "") {
                    commandsText += `\`${command?.name}\``
                } else {
                    commandsText += `, \`${command?.name}\``
                }
            })
            helpText += commandsText;
        })

        const replyEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`${this.client.user?.username} help menu :`)
            .setDescription(helpText)
            .setColor(Colors.Blurple)
            .setTimestamp(Date.now())
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({forceStatic: false})
            })

        interaction.reply({embeds: [replyEmbed]})
    }

}

export default PingCommand;