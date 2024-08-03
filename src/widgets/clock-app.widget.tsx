import type { FC } from "react";
import "../style/style.scss";
import type DecimalClock from "../classes/decimal-clock.class";
import useDecimalClock from "../hooks/use-decimal-clock.hook";
import { DECIMAL_SECOND } from "../constants/time.constants";
import DigitalDecimalDisplay from "./digital-decimal.widget";
import AnalogClock from "./analog-clock.widget";

interface ClockAppProps {
	decimalClock?: DecimalClock;
	title?: string;
	refreshRate?: number;
}

/** Defines the React app */
export const ClockApp: FC<ClockAppProps> = ({
	decimalClock,
	title,
	refreshRate = DECIMAL_SECOND,
}) => {
	const clock = useDecimalClock({ decimalClock });
	return (
		<div className="card">
			{title && <h1>{title}</h1>}
			<DigitalDecimalDisplay
				decimalClock={clock}
				refreshRate={refreshRate}
				blinkRate={1_000}
				showSeconds
				showMilliseconds
			/>
			<AnalogClock decimalClock={clock} refreshRate={refreshRate} showSeconds />
		</div>
	);
};

export default ClockApp;
