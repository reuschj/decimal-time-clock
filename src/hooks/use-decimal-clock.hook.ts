import { useMemo } from "react";
import DecimalClock from "../classes/decimal-clock.class";

type UseDecimalClockOptions = {
	decimalClock?: DecimalClock;
};

export const useDecimalClock = (
	options?: UseDecimalClockOptions,
): DecimalClock => {
	const { decimalClock } = options ?? {};
	const clock = useMemo(() => {
		if (decimalClock) {
			if (!decimalClock.isActive) {
				decimalClock.start();
			}
			return decimalClock;
		}
		return DecimalClock.create().start();
	}, [decimalClock]);

	return clock;
};

export default useDecimalClock;
