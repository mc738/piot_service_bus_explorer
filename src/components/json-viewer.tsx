/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "./ui/collapsible";

interface JsonViewerProps {
    data: object
}

function StringProperty({propertyKey, value}: StringPropertyProps) {
    return <div><span className="font-bold">{propertyKey}</span>: "{value}"</div>;
}

type StringPropertyProps = {
    propertyKey: string
    value: string
}

function NumberProperty({propertyKey, value}: NumberPropertyProps) {
    return <div><span className="font-bold">{propertyKey}</span>: {value}</div>;
}

type NumberPropertyProps = {
    propertyKey: string
    value: number
}

function BoolProperty({propertyKey, value}: BoolPropertyProps) {
    return <div><span className="font-bold">{propertyKey}</span>: {value ? 'true' : 'false'}</div>;
}

type BoolPropertyProps = {
    propertyKey: string
    value: boolean
}

function UndefinedProperty({propertyKey}: UndefinedPropertyProps) {
    return <div><span className="font-bold">{propertyKey}</span>: <span className="text-muted italic">undefined</span>
    </div>;
}

type UndefinedPropertyProps = {
    propertyKey: string
}

function PropertyItem({propertyKey, value}: NodeItemProps) {

    if (typeof value === "object") {
        if (value.constructor === Object) {
            return (
                <Collapsible
                    className="w-[350px] space-y-2"
                >
                    <CollapsibleTrigger asChild>
                        <div><span className="font-bold">{propertyKey}</span>: <span
                            className="text-muted-foreground">&#123;&#125;</span></div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="pl-4">
                            {Object.keys(value).map((key, i) => {
                                return <PropertyItem key={i} propertyKey={key} value={value[key]}/>;
                            })}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            );
        } else if (value.constructor === Array) {
            return (
                <Collapsible
                    className="w-[350px] space-y-2"
                >
                    <CollapsibleTrigger asChild>
                        <div><span className="font-bold">{propertyKey}</span>: <span
                            className="text-muted-foreground">&#91;&#93;</span></div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="pl-4">
                            {(value).map((item, i) => {
                            return (
                                <PropertyItem key={i} propertyKey={i.toString()} value={item}/>
                            )
                            })}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            );
        }
    } else if (typeof value === "string") {
        return <StringProperty propertyKey={propertyKey} value={value as unknown as string}/>;
    } else if (typeof value === "number") {
        return <NumberProperty propertyKey={propertyKey} value={value as unknown as number}/>;
    } else if (typeof value === "boolean") {
        return <BoolProperty propertyKey={propertyKey} value={value as unknown as boolean}/>;
    } else if (typeof value === "undefined") {
        return <UndefinedProperty propertyKey={propertyKey}/>;
    } else {
        return <div></div>
    }
}

type NodeItemProps = {
    propertyKey: string
    value: any
}



export function JsonViewer({data}: JsonViewerProps) {

    const d = data as any;

    return (
        <div className="font-mono">
            {
                Object.keys(d).map((key, i) => {
                    return <PropertyItem key={i} propertyKey={key} value={d[key]}/>;
                })
            }
        </div>
    )
}