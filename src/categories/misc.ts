import { Category } from "../struct/Category";

abstract class Miscellaneous extends Category {

    protected constructor() {
        super({
            name: "Miscellaneous",
            short: "misc",
            commands: [],
            emoji: ":robot:"
        })
    }

}

export default Miscellaneous;