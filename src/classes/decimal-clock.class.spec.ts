// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { DateTime } from "luxon";
import { type Subscription, lastValueFrom, take } from "rxjs";
import DecimalClock from "./decimal-clock.class";
import DecimalTime from "./decimal-time.class";

describe("DecimalClock class", () => {
  const baseTime = DateTime.fromObject({
    hour: 2,
    minute: 45,
    second: 23,
    millisecond: 234,
  });

  let decimalClock: DecimalClock;
  const refreshRate = 40;

  const subscriptions = new Set<Subscription>();

  beforeEach(() => {
    expect(baseTime.isValid).toBe(true);
    decimalClock = DecimalClock.create({ refreshRate });
  });

  afterEach(() => {
    if (decimalClock.isActive) decimalClock.stop();
    for (const subscription of subscriptions) {
      subscription.unsubscribe();
    }
    subscriptions.clear();
  });

  it("constructs correctly", () => {
    expect(decimalClock).toBeInstanceOf(DecimalClock);
    expect(decimalClock.isActive).toBeFalsy();
    expect(decimalClock.refreshRate).toBe(refreshRate);
  });

  it("can be started and stopped", async () => {
    expect(decimalClock.isActive).toBeFalsy();
    const decimalTimePromise = lastValueFrom(
      decimalClock.start().$.pipe(take(2)),
    );
    expect(decimalClock.isActive).toBeTruthy();
    const decimalTime = await decimalTimePromise;
    expect(decimalTime).toBeInstanceOf(DecimalTime);
    decimalClock.stop();
    expect(decimalClock.isActive).toBeFalsy();
  });

  it("publishes the current time", async () => {
    const current$ = decimalClock.start().$;
    const decimalTime = await lastValueFrom(current$.pipe(take(1)));
    expect(decimalTime).toBeInstanceOf(DecimalTime);
    decimalClock.stop();
  });

  it("publishes the current active status", async () => {
    const current$ = decimalClock.start().isActive$;
    const status = await lastValueFrom(current$.pipe(take(1)));
    expect(status).toBe(true);
    decimalClock.stop();
  });

  it("publishes the current refresh rate", async () => {
    const current$ = decimalClock.start().refreshRate$;
    const rate = await lastValueFrom(current$.pipe(take(1)));
    expect(rate).toBe(refreshRate);
    decimalClock.stop();
  });

  it("can change refresh rates", async () => {
    const current$ = decimalClock.start().refreshRate$;
    const rate = await lastValueFrom(current$.pipe(take(1)));
    expect(rate).toBe(refreshRate);
    const newRate = 20;
    decimalClock.changeRefreshRate(newRate);
    const nextRate = await lastValueFrom(current$.pipe(take(1)));
    expect(nextRate).toBe(newRate);
    decimalClock.stop();
  });
});
