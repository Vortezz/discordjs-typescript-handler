import {Colors, CommandInteraction, EmbedBuilder, Interaction, Message} from "discord.js";

export default function reject(toReject: Message | Interaction, rejectMessage: string) {

    const embed: EmbedBuilder = new EmbedBuilder().setDescription(`${rejectMessage}`).setColor(Colors.Red).setTimestamp(Date.now()).setTitle(`:x: Error :`)

    if (toReject instanceof Message) {
        const message: Message = toReject;
        embed.setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL({forceStatic: false})})
        message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
    } else {
        const interaction: Interaction = toReject;
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