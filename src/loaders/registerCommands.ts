import Bot from "../struct/Bot";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const registerCommands = (client: Bot) => {
    const globalCommandData: any[] = []

    client.commands.forEach(command => {
        globalCommandData.push(command.slashBuilder.toJSON())
    });

    const rest = new REST({ version: '9' }).setToken(client.token ?? "");

    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.application?.id ?? ""),
                { body: globalCommandData },
            );
        } catch (error) {
            console.error(error);
        }
    })();
}

export default registerCommands;