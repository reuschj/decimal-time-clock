export type PluralsOf<T> = T extends string
	? `${T}s`
	: {
			[Property in keyof T as `${string & Property}s`]: T[Property];
		};
