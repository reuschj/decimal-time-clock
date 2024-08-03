import React from "react";
import ReactDOM from "react-dom/client";
import ClockApp from "./widgets/clock-app.widget.tsx";
import "./style/index.scss";
import { DECIMAL_SECOND } from "./constants/time.constants.ts";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ClockApp title="Clock" refreshRate={DECIMAL_SECOND / 100} />
	</React.StrictMode>,
);
