import { DateTime } from "luxon";
import type { DecimalTimeComponents } from "../types/decimal-time.types";
import type { AnyDate } from "../types/time.types";
import { standardizeAnyDate } from "./standardize-any-date.util";
import { CONVERSION } from "../constants/time.constants";
import BuildNumber from "../builders/build-number.class";
import getMidnightOf from "./get-midnight-of.util";

/**
 * Utility function to convert any date input into to the time components for a decimal time
 *
 * @param date - Any date input, including JavaScript `Date`, Luxon `DateTime`, ISO string or Unix timestamp
 * @returns A tuple with decimal time components and Luxon date object
 */
export const getDecimalTime = (
	date: AnyDate = DateTime.now(),
): [DecimalTimeComponents, DateTime] => {
	const dateTime = standardizeAnyDate(date);
	const millisecondsInDay =
		dateTime.toMillis() - getMidnightOf(dateTime).toMillis();
	const decimalMillisecondsInDay =
		BuildNumber.from(millisecondsInDay).divideBy(CONVERSION);
	const decimalHours = BuildNumber.from(decimalMillisecondsInDay)
		.divideBy(1000)
		.divideBy(100)
		.divideBy(100);
	const hours = BuildNumber.from(decimalHours).floor();
	const decimalMinutes = BuildNumber.from(hours)
		.if((h) => h === 0)
		.then((b) => b.set(decimalHours))
		.else((b) => b.set(decimalHours.clone().mod(hours)))
		.multiplyBy(100);
	const minutes = BuildNumber.from(decimalMinutes).floor();
	const decimalSeconds = BuildNumber.from(minutes)
		.if((m) => m === 0)
		.then((b) => b.set(decimalMinutes))
		.else((b) => b.set(decimalMinutes.clone().mod(minutes)))
		.multiplyBy(100);
	const seconds = BuildNumber.from(decimalSeconds).floor();
	const decimalMilliseconds = BuildNumber.from(seconds)
		.if((s) => s === 0)
		.then((b) => b.set(decimalSeconds))
		.else((b) => b.set(decimalSeconds.clone().mod(seconds)))
		.multiplyBy(1_000);
	const milliseconds = BuildNumber.from(decimalMilliseconds).floor();
	const components = BuildNumber.valuesOf({
		hours,
		minutes,
		seconds,
		milliseconds,
	});
	return [components, dateTime];
};

export default getDecimalTime;
