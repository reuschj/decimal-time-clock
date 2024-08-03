import { useMemo, useState, type FC } from "react";
import type DecimalClock from "../classes/decimal-clock.class";
import ClockNumbers from "../components/clock-numbers.component";
import ClockHand from "../components/clock-hand.component";
import useDecimalClockComponents from "../hooks/use-decimal-clock-components.hook";

interface AnalogClockProps {
	decimalClock?: DecimalClock;
	refreshRate?: number;
	showSeconds?: boolean;
}

/** Component for an analog clock display for a decimal time */
export const AnalogClock: FC<AnalogClockProps> = ({
	decimalClock,
	refreshRate,
	showSeconds,
}: AnalogClockProps) => {
	const [numberCount] = useState(10);
	const { hours, minutes, seconds } = useDecimalClockComponents({
		decimalClock,
		clockType: "analog",
		refreshRate,
	});
	const clockNumbers = useMemo(
		() => <ClockNumbers count={numberCount} />,
		[numberCount],
	);
	return (
		<div className="analog-clock-face">
			{clockNumbers}
			<div className="clock-pivot" />
			<ClockHand rotation={hours} type="hour" />
			<ClockHand rotation={minutes} type="minute" />
			{showSeconds && <ClockHand rotation={seconds} type="second" />}
		</div>
	);
};

export default AnalogClock;
