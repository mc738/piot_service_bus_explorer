// noinspection ES6PreferShortImport

import React from "react";
import {TooltipProvider} from "./ui/tooltip";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "./ui/resizable";
import {cn} from "../lib/utils";
import {GroupSwitcher} from "../components/group_switcher";
import {Separator} from "./ui/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./ui/tabs";
import {Input} from "./ui/input";
import {Search} from "lucide-react";
import {MessageList} from "./message_list";
import {messages} from "../data/messages";
import {MessageDisplay} from "./message_display";
import {useMessage} from "../data/use-messages";

interface ExplorerProps {
    topics: {
        id: string
        name: string
        icon: React.ReactNode
    }[]
    defaultLayout: number[]
    defaultCollapsed?: boolean
    navCollapsedSize: number
}

export function Explorer(
    {
        topics,
        defaultLayout = [265, 440, 644],
        defaultCollapsed = false,
        navCollapsedSize
    }: ExplorerProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [message] = useMessage()


    const groups = [
        {
            id: "all",
            name: "All",
            icon: (
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title>iCloud</title>
                    <path
                        d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
                        fill="currentColor"
                    />
                </svg>
            )
        },
        {
            id: "group_1",
            name: "Group 1",
            icon: (
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title>iCloud</title>
                    <path
                        d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
                        fill="currentColor"
                    />
                </svg>
            )
        }
    ];

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
                }}
                className="h-full items-stretch">
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={15}
                    maxSize={20}
                    onCollapse={() => {
                        setIsCollapsed(true)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
                    }}
                    onExpand={() => {
                        setIsCollapsed(false)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
                    }}
                    className={cn(
                        isCollapsed &&
                        "min-w-[50px] transition-all duration-300 ease-in-out"
                    )}
                >
                    <div
                        className={cn(
                            "flex h-[56px] items-center justify-center",
                            isCollapsed ? "h-[56px]" : "px-2"
                        )}
                    >
                        <GroupSwitcher isCollapsed={isCollapsed} groups={groups}/>
                    </div>
                    <Separator/>

                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                    <Tabs defaultValue="all">
                        <div className="flex items-center px-4 py-2">
                            <h1 className="text-xl font-bold">Message</h1>
                            <TabsList className="ml-auto">
                                <TabsTrigger
                                    value="all"
                                    className="text-zinc-600 dark:text-zinc-200">
                                    All
                                </TabsTrigger>
                                <TabsTrigger
                                    value="queued"
                                    className="text-zinc-600 dark:text-zinc-200">
                                    Queued
                                </TabsTrigger>
                                <TabsTrigger
                                    value="dead-letter"
                                    className="text-zinc-600 dark:text-zinc-200">
                                    Dead letter
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <Separator/>
                        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                                    <Input placeholder="Search" className="pl-8"/>
                                </div>
                            </form>
                        </div>
                        <TabsContent value="all" className="m-0">
                            <MessageList items={messages}/>
                        </TabsContent>
                        <TabsContent value="queued" className="m-0">
                            <MessageList items={messages.filter((message) => message.status === 'queued')} />
                        </TabsContent>
                        <TabsContent value="dead-letter" className="m-0">
                            <MessageList items={messages.filter((message) => message.status === 'dead-letter')} />
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={defaultLayout[2]}>
                    <MessageDisplay message={messages.find((item) => item.id === message.selected) || null}></MessageDisplay>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )

}