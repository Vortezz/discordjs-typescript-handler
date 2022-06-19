import { CategoryConfig } from "./CategoryConfig";

export abstract class Category {
    public name: string;
    public emoji: string;
    public short: string;
    public commands: string[];

    protected constructor(options: CategoryConfig) {
        this.name = options.name;
        this.short = options.short;
        this.commands = options.commands;
        this.emoji = options.emoji;
    }
}