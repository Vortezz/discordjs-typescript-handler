# DKN -> DontKnowName

Powerful discord bot !

To use it, you just need to create a `src/config.ts` and fill it with :

```ts
export default {
    TOKEN: "",
    PREFIX: "",
    LOG_WEBHOOK: "",
    OWNERS: [""],
    DATABASE: {
        HOST: "127.0.0.1",
        PORT: 3006,
        USER: "root",
        PASS: "root",
        NAME: "dkn"
    }
}
```