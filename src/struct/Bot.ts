import {Client, Collection, WebhookClient} from 'discord.js';
import {CommandOptions} from './CommandConfig';
import config from '../config';
import {CategoryConfig} from './CategoryConfig';
import colors from "colors";
import loadCommands from '../loaders/loadCommands';
import loadEvents from '../loaders/loadEvents';

class Bot extends Client {
    public prefix: string;

    public commands = new Collection<string, CommandOptions>();

    public categories = new Collection<string, CategoryConfig>();

    public config = config;

    public constructor() {
        super({intents: 32767, allowedMentions: {repliedUser: false}});
        this.prefix = config.PREFIX;
    }

    public start() {
        this.load(`Connecting to Discord API Services`)

        if (config.TOKEN === "token") {
            console.error(colors.red(`[ERROR] You need to set the token in config.ts`));
            process.exit(1);
        }

        this.login(config.TOKEN).then(() => {

            console.log(colors.yellow(`Loading commands...`))
            loadCommands(this);
            this.sucess(`Commands loaded !`)
            console.log(colors.yellow(`Loading events...`))
            loadEvents(this);
            this.sucess(`Events loaded !`)

        })
    }

    public load(message: string): void {
        if (config.LOG_WEBHOOK !== "") {
            const logWebhook: WebhookClient = new WebhookClient({url: config.LOG_WEBHOOK})
            if (logWebhook == null) {
                return;
            }

            logWebhook.send({content: `:gear: ${message}`})
        }

        console.log(colors.grey("[LOAD] " + message))

    }

    public sucess(message: string): void {
        if (config.LOG_WEBHOOK !== "") {
            const logWebhook: WebhookClient = new WebhookClient({url: config.LOG_WEBHOOK})
            if (logWebhook == null) {
                return;
            }

            logWebhook.send({content: `:white_check_mark: ${message}`})
        }

        console.log(colors.green("[SUCCESS] " + message));

    }

    public warn(message: string): void {
        if (config.LOG_WEBHOOK !== "") {
            const logWebhook: WebhookClient = new WebhookClient({url: config.LOG_WEBHOOK})
            if (logWebhook == null) {
                return;
            }

            logWebhook.send({content: `:warning: ${message}`})
        }

        console.log(colors.yellow("[WARN] " + message));

    }

    public error(message: string): void {
        if (config.LOG_WEBHOOK !== "") {
            const logWebhook: WebhookClient = new WebhookClient({url: config.LOG_WEBHOOK})
            if (logWebhook == null) {
                return;
            }

            logWebhook.send({content: `:x: ${message}`})
        }

        console.log(colors.red("[ERROR] " + message));

    }
}

export default Bot;