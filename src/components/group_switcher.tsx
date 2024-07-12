// noinspection ES6PreferShortImport

import * as React from "react"
import {cn} from "../lib/utils"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select"

interface GroupSwitcherProps {
    isCollapsed: boolean;
    groups: {
        id: string
        name: string
        icon: React.ReactNode
    }[]
}

export function GroupSwitcher(
    {
        isCollapsed,
        groups
    }: GroupSwitcherProps) {

    const [selectedGroup, setSelectedGroup] = React.useState<string>(groups[0].id)

    return (
        <Select defaultValue={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger
                className={cn(
                    "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
                    isCollapsed &&
                    "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
                )}
                aria-label="Select group">
                <SelectValue placeholder="Select an account">
                    {groups.find((group) => group.id === selectedGroup)?.icon}
                    <span className={cn("ml-2", isCollapsed && "hidden")}>
                        {
                            groups.find((group) => group.id === selectedGroup)?.name
                        }
                    </span>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                        <div
                            className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">{group.icon}{group.name}</div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )

}