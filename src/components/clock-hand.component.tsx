import { useMemo, type FC } from "react";
import type { ClockHandType } from "../types/clock.types";
import getClockHandCssClass from "../util/get-clock-hand-css-class.util";

interface ClockHandProps {
	type: ClockHandType;
	rotation: number;
}

/** Component to draw an analog clock hand */
export const ClockHand: FC<ClockHandProps> = ({
	rotation = 0,
	type = "hour",
}: ClockHandProps) => {
	const className = useMemo(
		() => `clock-hand ${getClockHandCssClass(type)}`,
		[type],
	);
	const transform = useMemo(
		() => ({ transform: `rotate(${rotation}deg)` }),
		[rotation],
	);
	return <div className={className} style={transform} />;
};

export default ClockHand;
