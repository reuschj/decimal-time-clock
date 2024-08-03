import type { ClockTimeComponent } from "./time.types";
import type { PluralsOf } from "./util.types";

/** Components of time extracted from `DecimalTime` instance */
export type DecimalTimeComponents = Record<
	PluralsOf<ClockTimeComponent>,
	number
>;

/** Components of time extracted from `DecimalTime` instance when they represent rotation in degrees for a clock hand */
export type DecimalTimeRotationComponents = DecimalTimeComponents;
