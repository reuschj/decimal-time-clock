import type { FC } from "react";

interface ClockNumberProps {
	number?: number;
	id?: string;
}

/** Component to draw an analog clock number */
export const ClockNumber: FC<ClockNumberProps> = ({ number = 0, id }) => (
	<div className="clock-number" id={id}>
		{number}
	</div>
);

export default ClockNumber;
