import React from "react";

interface JsonViewerProps {
    data: object
}

function StringProperty({key, value}: StringPropertyProps) {
    return <div><span className="font-bold">{key}</span>: "{value}"</div>;
}

type StringPropertyProps = {
    key: string
    value: string
}

function NumberProperty({key, value}: NumberPropertyProps) {
    return <div><span className="font-bold">{key}</span>: {value}</div>;
}

type NumberPropertyProps = {
    key: string
    value: number
}

function BoolProperty({key, value}: BoolPropertyProps) {
    return <div><span className="font-bold">{key}</span>: {value ? 'true' : 'false'}</div>;
}

type BoolPropertyProps = {
    key: string
    value: boolean
}

function UndefinedProperty({key}: UndefinedPropertyProps) {
    return <div><span className="font-bold">{key}</span>: <span className="text-muted italic">undefined</span></div>;
}

type UndefinedPropertyProps = {
    key: string
}

function NodeItem({key, value}: NodeItemProps) {

    if (typeof value === "object") {
        if (value.constructor === Object) {
            return <div></div>;
        } else if (value.constructor === Array) {
            return <div></div>;
        }
    } else if (typeof value === "string") {
        console.log(key);
        return <StringProperty key={key} value={value as unknown as string}/>;
    } else if (typeof value === "number") {
        return <NumberProperty key={key} value={value as unknown as number}/>;
    } else if (typeof value === "boolean") {
        return <BoolProperty key={key} value={value as unknown as boolean}/>;
    } else if (typeof value === "undefined") {
        return <UndefinedProperty key={key}/>;
    } else {
        return <div></div>
    }
}

type NodeItemProps = {
    key: string
    value: any
}

export function JsonViewer({data}: JsonViewerProps) {

    const d = data as any;

    return (
        <div>
            {
                Object.keys(d).map(key => {
                    return <NodeItem key={key} value={d[key]}/>;
                })
            }
        </div>
    )
}