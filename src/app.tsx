import './index.css';

import {
    Package2,
    Home, PanelLeft, Link, ShoppingCart, Package, Users2, LineChart
} from "lucide-react";

import * as React from 'react';
import {createRoot} from "react-dom/client";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "./components/ui/tooltip";
import {Sheet, SheetContent, SheetTrigger} from "./components/ui/sheet";
import {Button} from "./components/ui/button";
import {Card} from "./components/ui/card";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "./components/ui/resizable";
import {Explorer} from "./components/explorer";

const root = createRoot(document.getElementById('root'));

//const layout = cookies().get("react-resizable-panels:layout")
//const collapsed = cookies().get("react-resizable-panels:collapsed")

//const defaultLayout = layout ? JSON.parse(layout.value) : undefined
//const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined


root.render(
    <React.StrictMode>
        <div className="h-dvh w-full">
            <Explorer topics={[]} defaultLayout={[265, 440, 655]} navCollapsedSize={4} />
        </div>
    </React.StrictMode>
)