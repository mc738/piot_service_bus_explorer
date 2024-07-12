import {MessageItem, messages} from "../data/messages";
import React from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "./ui/tooltip";
import {Button} from "./ui/button";
import {Archive, Reply} from "lucide-react";
import {Separator} from "./ui/separator";
import {JSONTree} from "react-json-tree";
import {JsonViewer} from "./json-viewer";

interface MessageDisplayProps {
    message: MessageItem | null
}

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633',
};

const data = {
    name: "name",
    description: "description",
    date: Date(),
    data: {
        id: "id",
        name: "data name",
        user: "user_1"
    },
    items: [
        {
            id: "item_1",
            name: "Item 1",
            description: "This is item 1",
            labels: ["label1", "label2"]
        },
        {
            id: "item_2",
            name: "Item 2",
            description: "This is item 2",
            subItems: [{name: "sub item 1"}, {name: "sub item 2"}]
        }
    ]
}


export function MessageDisplay({message}: MessageDisplayProps) {
    const today = Date()

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center p-2">
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!message}>
                                <Archive className="h-4 w-4"/>
                                <span className="sr-only">Archive</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Archive</TooltipContent>
                    </Tooltip>

                    <Separator orientation="vertical" className="mx-1 h-6"/>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!message}>
                                <Reply className="h-4 w-4"/>
                                <span className="sr-only">Reply</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reply</TooltipContent>
                    </Tooltip>
                </div>
            </div>
            <Separator/>
            {message ? (
                <div className="flex flex-1 flex-col">
                    <div className="flex items-start p-4">
                        <div className="flex items-start gap-4 text-sm">
                            <h1>{message.name}</h1>

                            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                                <JsonViewer data={data}/>


                                <JSONTree
                                    data={data}
                                    theme={{
                                        extend: theme,
                                        // underline keys for literal values
                                        valueLabel: {
                                            textDecoration: 'underline',
                                        },
                                        // switch key for objects to uppercase when object is expanded.
                                        // `nestedNodeLabel` receives additional argument `expandable`
                                        nestedNodeLabel: ({style}, keyPath, nodeType, expanded) => ({
                                            style: {
                                                ...style,
                                                textTransform: expanded ? 'uppercase' : style.textTransform,
                                            },
                                        }),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-8 text-center text-muted-foreground">
                    No message selected
                </div>
            )}
        </div>
    );
}