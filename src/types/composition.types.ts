export type Identifiable<I = string> = {
	id: I;
};

export type Named<N = string> = {
	name: N;
};

export type Labeled<L = string> = {
	label: L;
};

export type Runnable = {
	isRunning?: boolean;
	run(): void;
	stop(): void;
};
