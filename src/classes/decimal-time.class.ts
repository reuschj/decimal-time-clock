import { DateTime } from "luxon";
import type {
	DecimalTimeComponents,
	DecimalTimeRotationComponents,
} from "../types/decimal-time.types";
import type { AnyDate } from "../types/time.types";
import getDecimalTime from "../util/get-decimal-time.util";
import { FULL_CIRCLE_DEGREES } from "../constants/common";
import BuildNumber from "../builders/build-number.class";

/** Class to convert and hold decimal time */
export class DecimalTime {
	protected components: DecimalTimeComponents;
	protected baseDate: DateTime;

	// 🏗️ Constructor ------------------------------------------ /

	protected constructor(date: AnyDate) {
		const [components, baseDate] = getDecimalTime(date);
		this.components = components;
		this.baseDate = baseDate;
	}

	/**
	 * Decimal time for the current instant
	 */
	public static now() {
		return new DecimalTime(DateTime.now());
	}

	/**
	 * @param date - Pass date in any acceptable format
	 */
	public static from(date: AnyDate) {
		return new DecimalTime(date);
	}

	/**
	 * @param date - ISO string
	 */
	public static fromISO(iso: string) {
		return new DecimalTime(DateTime.fromISO(iso));
	}

	/**
	 * @param date - Unix timestamp (number)
	 */
	public static fromTimestamp(timestamp: number) {
		return new DecimalTime(DateTime.fromMillis(timestamp));
	}

	/**
	 * @param date - JavaScript `Date` instance
	 */
	public static fromDate(date: Date) {
		return new DecimalTime(DateTime.fromJSDate(date));
	}

	/**
	 * @param date - Luxon `DateTime` object
	 */
	public static fromDateTime(dateTime: DateTime) {
		return new DecimalTime(dateTime);
	}

	// 📣 Public ------------------------------------------ /

	/** Whole decimal hours since midnight */
	public get hours(): number {
		return this.components.hours;
	}

	/** Whole decimal minutes since last hour */
	public get minutes(): number {
		return this.components.minutes;
	}

	/** Whole decimal seconds since last minute */
	public get seconds(): number {
		return this.components.seconds;
	}

	/** Whole decimal milliseconds since last second */
	public get milliseconds(): number {
		return this.components.milliseconds;
	}

	/** Day of the date */
	public get day(): number {
		return this.baseDate.get("day");
	}

	/** Month of the date */
	public get month(): number {
		return this.baseDate.get("month");
	}

	/** Year of the date */
	public get year(): number {
		return this.baseDate.get("year");
	}

	/**
	 * @returns The clock hand rotations in degrees for each time component
	 */
	get rotation(): DecimalTimeRotationComponents {
		const decimalMilliseconds = BuildNumber.from(this.milliseconds).divideBy(
			1000,
		);
		const decimalSeconds = BuildNumber.from(this.seconds)
			.add(decimalMilliseconds)
			.divideBy(100);
		const decimalMinutes = BuildNumber.from(this.minutes)
			.add(decimalSeconds)
			.divideBy(100);
		const decimalHours = BuildNumber.from(this.minutes)
			.add(decimalMinutes)
			.divideBy(10);
		return BuildNumber.valuesOf({
			hours: decimalHours.multiplyBy(FULL_CIRCLE_DEGREES),
			minutes: decimalMinutes.multiplyBy(FULL_CIRCLE_DEGREES),
			seconds: decimalSeconds.multiplyBy(FULL_CIRCLE_DEGREES),
			milliseconds: decimalMilliseconds.multiplyBy(FULL_CIRCLE_DEGREES),
		});
	}

	/**
	 * @returns A descriptive time string of the decimal time instance
	 */
	public get description(): string {
		const { hours, minutes, seconds, milliseconds } = this.components;
		const paddedHours = hours.toString().padStart(2, "0");
		const paddedMinutes = minutes.toString().padStart(2, "0");
		const paddedSeconds = seconds.toString().padStart(2, "0");
		const paddedMilliseconds = milliseconds.toString().padStart(3, "0");
		return `${paddedHours}:${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
	}

	/**
	 * @returns String representation
	 */
	public toString(): string {
		return this.description;
	}

	// 🔐 Protected / private ------------------------------------------ /

	// 🧊 Static ------------------------------------------ /
}

export default DecimalTime;
