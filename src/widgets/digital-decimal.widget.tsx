import { useEffect, type FC } from "react";
import type DecimalClock from "../classes/decimal-clock.class";
import useDecimalClockComponents from "../hooks/use-decimal-clock-components.hook";
import useBlink from "../hooks/use-blink.hook";
import TimeDigits from "../components/time-digits.component";
import Separator from "../components/separator.component";
import { DECIMAL_SECOND } from "../constants/time.constants";

interface DigitalDisplayProps {
	decimalClock?: DecimalClock;
	refreshRate?: number;
	blinkRate?: number;
	showSeconds?: boolean;
	showMilliseconds?: boolean;
}

/** Component for a digital display of a decimal time */
export const DigitalDecimalDisplay: FC<DigitalDisplayProps> = ({
	decimalClock,
	refreshRate = DECIMAL_SECOND,
	blinkRate,
	showSeconds,
	showMilliseconds,
}: DigitalDisplayProps) => {
	const { hours, minutes, seconds, milliseconds } = useDecimalClockComponents({
		decimalClock,
		clockType: "digital",
		refreshRate,
	});
	const visible = useBlink(blinkRate);
	const sepChar = ":";

	useEffect(() => {
		if (showMilliseconds && refreshRate >= DECIMAL_SECOND) {
			decimalClock?.changeRefreshRate(DECIMAL_SECOND / 10);
		}
	}, [decimalClock, refreshRate, showMilliseconds]);

	return (
		<div className="center">
			<div className="digital-display">
				<TimeDigits value={hours} padAmount={2} />
				<Separator char={sepChar} visible={visible} />
				<TimeDigits value={minutes} padAmount={2} />
				{showSeconds && <Separator char={sepChar} visible={visible} />}
				{showSeconds && <TimeDigits value={seconds} padAmount={2} />}
				{showMilliseconds && <Separator char={"."} visible={visible} />}
				{showMilliseconds && <TimeDigits value={milliseconds} padAmount={3} />}
			</div>
		</div>
	);
};

export default DigitalDecimalDisplay;
