import type { DateTime } from "luxon";

export type AnyDate = Date | DateTime | string | number;

/** Time delineations expressible by a clock */
export type ClockTimeComponent = "hour" | "minute" | "second" | "millisecond";

/** Every second of the clock is either a tick or a tock */
export type TickTock = "tick" | "tock";
