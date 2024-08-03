import { useState, useEffect, useMemo } from "react";
import type { Subscription } from "rxjs";
import { DECIMAL_SECOND } from "../constants/time.constants";
import type { DecimalTimeComponents } from "../types/decimal-time.types";
import type DecimalClock from "../classes/decimal-clock.class";
import type { TickTock } from "../types/time.types";
import type { ClockType } from "../types/clock.types";
import useDecimalClock from "./use-decimal-clock.hook";

type UseDecimalClockComponentOptions = {
	decimalClock?: DecimalClock;
	clockType?: ClockType;
	refreshRate?: number;
};

type UseDecimalClockReturn = DecimalTimeComponents & {
	clock: DecimalClock;
	tickTock: TickTock;
};

export const useDecimalClockComponents = (
	options?: UseDecimalClockComponentOptions,
): UseDecimalClockReturn => {
	const {
		decimalClock,
		clockType = "analog",
		refreshRate = DECIMAL_SECOND,
	} = options ?? {};

	const clock = useDecimalClock({ decimalClock });

	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [milliseconds, setMilliseconds] = useState(0);
	const [tickTock, setTickTock] = useState<TickTock>("tick");

	useEffect(() => {
		clock.changeRefreshRate(refreshRate);
	}, [clock, refreshRate]);

	useEffect(() => {
		const subscriptions: Subscription[] = [];
		subscriptions.push(
			clock.tickTock$.subscribe((tickTock) => {
				setTickTock(tickTock);
			}),
		);
		switch (clockType) {
			case "analog":
				subscriptions.push(
					clock.$.subscribe((decimalTime) => {
						setHours(decimalTime.rotation.hours);
						setMinutes(decimalTime.rotation.minutes);
						setSeconds(decimalTime.rotation.seconds);
						setMilliseconds(decimalTime.rotation.milliseconds);
					}),
				);
				break;
			case "digital":
				subscriptions.push(
					clock.$.subscribe((decimalTime) => {
						setHours(decimalTime.hours);
						setMinutes(decimalTime.minutes);
						setSeconds(decimalTime.seconds);
						setMilliseconds(decimalTime.milliseconds);
					}),
				);
		}
		return () => {
			for (const subscription of subscriptions) {
				subscription.unsubscribe();
			}
		};
	}, [clock, clockType]);

	return useMemo(
		() => ({ hours, minutes, seconds, milliseconds, clock, tickTock }),
		[clock, hours, milliseconds, minutes, seconds, tickTock],
	);
};

export default useDecimalClockComponents;
