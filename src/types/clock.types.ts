import type { ClockTimeComponent } from "./time.types";

/** Enum for types of clock hands */
export type ClockType = "analog" | "digital";

/** Enum for types of clock hands */
export type ClockHandType = Exclude<ClockTimeComponent, "millisecond">;
