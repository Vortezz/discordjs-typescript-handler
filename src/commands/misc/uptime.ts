import {CommandInteraction, Message} from "discord.js";
import success from "../../qresponses/sucess";
import {Command} from "../../struct/Command";
import {SlashCommandBuilder} from "@discordjs/builders";

abstract class UptimeCommand extends Command {

    protected constructor() {
        super({
            name: "uptime",
            usage: "{prefix}uptime",
            category: "misc",
            desc: "Get bot's uptime !",
            ownerOnly: false,
            userPermission: [],
            slashBuilder: new SlashCommandBuilder().setName("uptime").setDescription("Get the bot's uptime")
        })
    }

    run(message: Message, args: string[]) {

        if (this.client.uptime == null) {
            return;
        }

        const uptime: number = this.client.uptime;

        let delta: number = Math.abs(uptime) / 1000;

        const days: number = Math.floor(delta / 86400);
        delta -= days * 86400;

        const hours: number = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        const minutes: number = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        const seconds: number = Math.floor(delta) % 60;

        let formattedTime: string = "";

        if (days != 0) {
            formattedTime += `${days.toString().length == 1 ? "0" + days : days}d `
        }

        if (hours != 0) {
            formattedTime += `${hours.toString().length == 1 ? "0" + hours : hours}h `
        }

        if (minutes != 0) {
            formattedTime += `${minutes.toString().length == 1 ? "0" + minutes : minutes}mn `
        }

        formattedTime += `${seconds.toString().length == 1 ? "0" + seconds : seconds}s`

        success(message, `Uptime : ${formattedTime}`)
    }

    interact(interaction: CommandInteraction) {
        if (this.client.uptime == null) {
            return;
        }

        const uptime: number = this.client.uptime;

        let delta: number = Math.abs(uptime) / 1000;

        const days: number = Math.floor(delta / 86400);
        delta -= days * 86400;

        const hours: number = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        const minutes: number = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        const seconds: number = Math.floor(delta) % 60;

        let formattedTime: string = "";

        if (days != 0) {
            formattedTime += `${days.toString().length == 1 ? "0" + days : days}d `
        }

        if (hours != 0) {
            formattedTime += `${hours.toString().length == 1 ? "0" + hours : hours}h `
        }

        if (minutes != 0) {
            formattedTime += `${minutes.toString().length == 1 ? "0" + minutes : minutes}mn `
        }

        formattedTime += `${seconds.toString().length == 1 ? "0" + seconds : seconds}s`

        success(interaction, `Uptime : ${formattedTime}`)
    }

}

export default UptimeCommand;