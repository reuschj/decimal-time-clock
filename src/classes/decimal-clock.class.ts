import {
  BehaviorSubject,
  type Observable,
  Subject,
  type Subscription,
  map,
  mergeMap,
  timer,
} from "rxjs";
import * as timeConstants from "../constants/time.constants";
import type { TickTock } from "../types/time.types";
import DecimalTime from "./decimal-time.class";

export type DecimalClockOptions = {
  refreshRate?: number;
};

/** Class to convert and hold decimal time */
export class DecimalClock {
  protected refreshRateSubject$: BehaviorSubject<number>;

  protected isActiveSubject$ = new BehaviorSubject(false);
  protected decimalTimeSubject$ = new Subject<DecimalTime>();
  protected tickTockSubject$ = new BehaviorSubject<TickTock>("tick");

  protected decimalTime$?: Observable<DecimalTime>;
  protected subscription?: Subscription;

  // 🏗️ Constructor ------------------------------------------ /

  protected constructor(options?: DecimalClockOptions) {
    const { refreshRate = timeConstants.DECIMAL_SECOND } = options || {};
    this.refreshRateSubject$ = new BehaviorSubject(refreshRate);
  }

  /**
   * Create a new Decimal clock instance
   *
   * @param options - Options object
   * @param options.refreshRate - Set the refresh interval of the clock (defaults to 100ms)
   *
   * @returns A new `DecimalClock` instance
   */
  public static create(options?: DecimalClockOptions): DecimalClock {
    return new DecimalClock(options);
  }

  /**
   * Create a new Decimal clock instance and instantly start it
   *
   * @param options - Options object
   * @param options.refreshRate - Set the refresh interval of the clock (defaults to 100ms)
   *
   * @returns A new `DecimalClock` instance that starts instantly
   */
  public static start(options?: DecimalClockOptions): DecimalClock {
    return new DecimalClock(options).start();
  }

  // 📣 Public ------------------------------------------ /

  public get $(): Observable<DecimalTime> {
    return this.decimalTimeSubject$.asObservable();
  }

  public get isActive$(): Observable<boolean> {
    return this.isActiveSubject$.asObservable();
  }

  public get isActive(): boolean {
    return this.isActiveSubject$.getValue();
  }

  public get refreshRate$(): Observable<number> {
    return this.refreshRateSubject$.asObservable();
  }

  public get refreshRate(): number {
    return this.refreshRateSubject$.getValue();
  }

  public set refreshRate(refreshRate: number) {
    if (this.refreshRateSubject$.getValue() === refreshRate) return;
    this.refreshRateSubject$.next(refreshRate);
  }

  public get tickTock$(): Observable<TickTock> {
    return this.tickTockSubject$.asObservable();
  }

  public get tickTock(): TickTock {
    return this.tickTockSubject$.getValue();
  }

  /**
   * Starts the clock updating with given refresh rate
   *
   * @param refreshRate - Refresh rate for clock updates
   */
  public start(options?: DecimalClockOptions): DecimalClock {
    if (
      typeof options?.refreshRate === "number" &&
      options.refreshRate !== this.refreshRateSubject$.getValue()
    )
      this.refreshRateSubject$.next(options.refreshRate);
    if (this.isActiveSubject$.getValue() === true) return this;
    this.isActiveSubject$.next(true);
    this.decimalTime$ = this.refreshRate$.pipe(
      mergeMap((refreshRate) =>
        timer(0, refreshRate).pipe(map(() => DecimalTime.now())),
      ),
    );
    this.subscription = this.decimalTime$?.subscribe((currentTime) => {
      this.decimalTimeSubject$.next(currentTime);
      this.tickTockSubject$.next(this.nextTickTock);
    });
    return this;
  }

  /** Changes the clock's refresh rate */
  public changeRefreshRate(refreshRate: number): DecimalClock {
    this.refreshRate = refreshRate;
    return this;
  }

  /** Stops the clock updating */
  public stop(): DecimalClock {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
    if (this.isActiveSubject$.getValue() === false) return this;
    this.decimalTime$ = undefined;
    this.isActiveSubject$.next(false);
    return this;
  }

  // 🔐 Protected / private ------------------------------------------ /

  protected get nextTickTock(): TickTock {
    return this.tickTock === "tick" ? "tock" : "tick";
  }

  // 🧊 Static ------------------------------------------ /
}

export default DecimalClock;
