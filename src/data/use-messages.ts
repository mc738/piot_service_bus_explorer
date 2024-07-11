import { atom, useAtom } from "jotai"

import { MessageItem, messages } from "./messages"

type Config = {
    selected: MessageItem["id"] | null
}

const configAtom = atom<Config>({
    selected: messages[0].id,
})

export function useMessage() {
    return useAtom(configAtom)
}