// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { beforeEach, describe, it, expect } from "bun:test";
import { DateTime } from "luxon";
import getDecimalTime from "./get-decimal-time.util";
import getMidnightOf from "./get-midnight-of.util";

describe("utilities", () => {
	describe("getDecimalTime", () => {
		const baseTime = DateTime.fromObject({
			hour: 2,
			minute: 45,
			second: 23,
			millisecond: 234,
		});

		beforeEach(() => {
			expect(baseTime.isValid).toBe(true);
		});

		it("converts to the correct decimal time", () => {
			const [components, date] = getDecimalTime(baseTime);
			expect(date.isValid).toBe(true);
			expect(components.hours).toBe(1);
			expect(components.minutes).toBe(14);
			expect(components.seconds).toBe(85);
			expect(components.milliseconds).toBe(224);
		});
	});

	describe("getMidnightOf", () => {
		const baseTime = DateTime.fromObject({
			year: 2013,
			month: 6,
			day: 3,
			hour: 2,
			minute: 45,
			second: 23,
			millisecond: 234,
		});

		beforeEach(() => {
			expect(baseTime.isValid).toBe(true);
		});

		it("converts to the correct decimal time", () => {
			const midnight = getMidnightOf(baseTime);
			expect(midnight.isValid).toBe(true);
			expect(midnight.get("year")).toBe(baseTime.get("year"));
			expect(midnight.get("month")).toBe(baseTime.get("month"));
			expect(midnight.get("day")).toBe(baseTime.get("day"));
			expect(midnight.get("hour")).toBe(0);
			expect(midnight.get("minute")).toBe(0);
			expect(midnight.get("second")).toBe(0);
			expect(midnight.get("millisecond")).toBe(0);
		});
	});
});
