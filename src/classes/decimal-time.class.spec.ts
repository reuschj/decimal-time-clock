// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { beforeEach, describe, it, expect } from "bun:test";
import { DateTime } from "luxon";
import DecimalTime from "./decimal-time.class";

describe("DecimalTime class", () => {
  const baseTime = DateTime.fromObject({
    hour: 2,
    minute: 45,
    second: 23,
    millisecond: 234,
  });

  let decimalTime: DecimalTime;

  beforeEach(() => {
    expect(baseTime.isValid).toBe(true);
    decimalTime = DecimalTime.from(baseTime);
  });

  it("constructs correctly", () => {
    expect(decimalTime).toBeInstanceOf(DecimalTime);
  });

  it("converts time correctly to decimal time", () => {
    expect(decimalTime.hours).toBe(1);
    expect(decimalTime.minutes).toBe(14);
    expect(decimalTime.seconds).toBe(85);
    expect(decimalTime.milliseconds).toBe(224);
    expect(decimalTime.year).toBe(baseTime.get("year"));
    expect(decimalTime.month).toBe(baseTime.get("month"));
    expect(decimalTime.day).toBe(baseTime.get("day"));
  });

  it("calculates hand rotations", () => {
    const { hours, minutes, seconds, milliseconds } = decimalTime.rotation;
    const round = (x: number) => Math.round(x * 100) / 100;
    expect(round(hours)).toBe(509.35);
    expect(round(minutes)).toBe(53.47);
    expect(round(seconds)).toBe(306.81);
    expect(round(milliseconds)).toBe(80.64);
  });

  it("can be described", () => {
    expect(decimalTime.description).toBe("01:14:85.224");
  });
});
