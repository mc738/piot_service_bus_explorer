import './index.css';

import * as React from 'react';
import { createRoot} from "react-dom/client";

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <h1 className="font-bold text-2xl underline font-mono">Hello, World!</h1>
    </React.StrictMode>
)