import { DateTime } from "luxon";

/**
 * @param dateTime - Luxon date
 *
 * @returns A Luxon date the is the same as the input but with time set to midnight
 */
export const getMidnightOf = (dateTime: DateTime = DateTime.now()): DateTime =>
	DateTime.fromObject({
		year: dateTime.get("year"),
		month: dateTime.get("month"),
		day: dateTime.get("day"),
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
	});

export default getMidnightOf;
