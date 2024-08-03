import { useMemo, type FC } from "react";
import ClockNumber from "./clock-number.component";

interface ClockNumbersProps {
	count?: number;
}

/** Component to position clock numbers evenly around the clock */
export const ClockNumbers: FC<ClockNumbersProps> = ({
	count = 10,
}: ClockNumbersProps) => {
	const numbers = useMemo(() => {
		const numberList = [];
		for (let i = 0; i < count; i += 1) {
			numberList.push(i);
		}
		return numberList.map((number) => {
			const padded = number.toString().padStart(2, "0");
			const id = `clock-number-position${padded}`;
			const subId = `clock-number${padded}`;
			return (
				<div key={id} className="clock-numbers" id={id}>
					<ClockNumber number={number} id={subId} />
				</div>
			);
		});
	}, [count]);
	return <div className="clock-numbers">{numbers}</div>;
};

export default ClockNumbers;
