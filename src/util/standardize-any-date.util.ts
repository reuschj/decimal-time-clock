import { DateTime } from "luxon";
import type { AnyDate } from "../types/time.types";

export const standardizeAnyDate = (date: AnyDate): DateTime => {
	if (typeof date === "string") return DateTime.fromISO(date);
	if (typeof date === "number") return DateTime.fromMillis(date);
	if (date instanceof Date) return DateTime.fromJSDate(date);
	return date;
};
