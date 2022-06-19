import {Colors, CommandInteraction, EmbedBuilder, Interaction, Message} from "discord.js";

export default function success(toSuccess: Message | Interaction, successMessage: string) {

    const embed: EmbedBuilder = new EmbedBuilder().setDescription(`${successMessage}`).setColor(Colors.Green).setTimestamp(Date.now()).setTitle(`:white_check_mark: Success :`)

    if (toSuccess instanceof Message) {
        const message: Message = toSuccess;
        embed.setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL({forceStatic: false})})
        message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
    } else {
        const interaction: Interaction = toSuccess;
        embed.setFooter({
            text: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({forceStatic: false})
        })
        if (interaction.isChatInputCommand()) {
            const commandInteraction: CommandInteraction = interaction;
            commandInteraction.reply({embeds: [embed], ephemeral: true})
        }
    }

}