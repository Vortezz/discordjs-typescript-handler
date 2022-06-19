import { readdirSync } from "fs";
import Bot from "../struct/Bot"
import { Category } from "../struct/Category";
import { Command } from "../struct/Command";

const loadCommands = (client: Bot) => {
    readdirSync("src/commands").forEach(categoryFileName => {
        delete require.cache[require.resolve(`../categories/${categoryFileName}.ts`)];
        const categoryFile = require(`../categories/${categoryFileName}.ts`).default;
        if (categoryFile.prototype instanceof Category) {
            const category: Category = new categoryFile;
            readdirSync(`src/commands/${categoryFileName}`).forEach(commandFileName => {
                delete require.cache[require.resolve(`../commands/${categoryFileName}/${commandFileName}`)];
                const commandFile = require(`../commands/${categoryFileName}/${commandFileName}`).default;
                if (commandFile.prototype instanceof Command) {
                    const command: Command = new commandFile;
                    command.client = client;
                    client.commands.set(command.name, command);
                    category.commands.push(command.name)
                }
            })
            client.categories.set(category.name, category);
        }
    })
}

export default loadCommands;