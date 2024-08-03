import { Fragment } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./style/App.css";
import ClockApp from "./widgets/clock-app.widget";

function App() {
	return (
		<Fragment>
			<div className="card">
				<ClockApp title="Clock" />
			</div>
			<div className="card">
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
		</Fragment>
	);
}

export default App;
