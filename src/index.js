import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";

import 'bootstrap/dist/css/bootstrap.min.css';

console.log(`${process.env.APP_NAME} ${process.env.VERSION}`);

const container = document.getElementById('qrex-root');
const root = createRoot(container);
root.render(
    <div>
        <App />
    </div>
)