import {MessageItem, messages} from "../data/messages";
import React from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "./ui/tooltip";
import {Button} from "./ui/button";
import {Archive, Reply} from "lucide-react";
import {Separator} from "./ui/separator";

interface MessageDisplayProps {
    message: MessageItem | null
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