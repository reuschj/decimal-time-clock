import type { ClockHandType } from "../types/clock.types";

/**
 * Gets a CSS class name for each clock hand type
 *
 * @param type
 * @returns A string CSS class name
 */
export const getClockHandCssClass = (type: ClockHandType): string => {
	switch (type) {
		case "hour":
			return "hour-hand";
		case "minute":
			return "minute-hand";
		case "second":
			return "second-hand";
		default:
			return "";
	}
};

export default getClockHandCssClass;
