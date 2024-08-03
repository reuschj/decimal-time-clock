import { useMemo, type FC } from "react";

interface TimeDigitProps {
	value?: number;
	padAmount?: number;
}

/** Component for numeric digits representing the time components on a digital display */
export const TimeDigits: FC<TimeDigitProps> = ({
	value = 0,
	padAmount = 2,
}: TimeDigitProps) => {
	const padded = useMemo(
		() => value.toString().padStart(padAmount, "0"),
		[padAmount, value],
	);
	return (
		<div className="display-component time-digits display-chars">{padded}</div>
	);
};

export default TimeDigits;
