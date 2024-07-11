import React from "react";

interface JsonViewerProps {
    data: object
}

function StringProperty({stringPropertyKey, value}: StringPropertyProps) {
    return <div><span className="font-bold">{stringPropertyKey}</span>: "{value}"</div>;
}

type StringPropertyProps = {
    stringPropertyKey: string
    value: string
}

function NumberProperty({numberPropertyKey, value}: NumberPropertyProps) {
    return <div><span className="font-bold">{numberPropertyKey}</span>: {value}</div>;
}

type NumberPropertyProps = {
    numberPropertyKey: string
    value: number
}

function BoolProperty({boolPropertyKey, value}: BoolPropertyProps) {
    return <div><span className="font-bold">{boolPropertyKey}</span>: {value ? 'true' : 'false'}</div>;
}

type BoolPropertyProps = {
    boolPropertyKey: string
    value: boolean
}

function UndefinedProperty({undefinedPropertyKey}: UndefinedPropertyProps) {
    return <div><span className="font-bold">{undefinedPropertyKey}</span>: <span className="text-muted italic">undefined</span></div>;
}

type UndefinedPropertyProps = {
    undefinedPropertyKey: string
}

function PropertyItem({propertyKey, value}: NodeItemProps) {

    if (typeof value === "object") {
        if (value.constructor === Object) {
            return <div></div>;
        } else if (value.constructor === Array) {
            return <div></div>;
        }
    } else if (typeof value === "string") {
        return <StringProperty stringPropertyKey={propertyKey} value={value as unknown as string}/>;
    } else if (typeof value === "number") {
        return <NumberProperty numberPropertyKey={propertyKey} value={value as unknown as number}/>;
    } else if (typeof value === "boolean") {
        return <BoolProperty boolPropertyKey={propertyKey} value={value as unknown as boolean}/>;
    } else if (typeof value === "undefined") {
        return <UndefinedProperty undefinedPropertyKey={propertyKey}/>;
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