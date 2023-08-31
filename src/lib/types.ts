import type { SvelteComponent, SvelteComponentTyped } from 'svelte';

export interface MovePayload {
	by: number;
}

export interface SidestepPayload {
	steps: Steps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

export type StepComponentEvents = {
	/** Go forward one step (or a custom amount by setting `by`). */
	goForward?: MovePayload;
	/** Go backward one step (or a custom amount by setting `by`). */
	goBackward?: MovePayload;
	/**
	 * Temporarily append a secondary flow after the current step, and
	 * navigate to the first step in the sidestep. Once the sidestep flow
	 * triggers `conclude`, go back to the original step in the original flow.
	 */
	sidestep: SidestepPayload;
	cancelSidestep: null | undefined;
};

type OmitContext<T> = Omit<T, 'context' | 'currentStepIndex'>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<T> = T extends SvelteComponentTyped<infer P, any, any> ? OmitContext<P> : never;
export type PropsOrUndefined<T> = Props<T> extends Record<string, never> ? undefined : Props<T>;

export type Step<T extends SvelteComponent> = {
	component: Constructor<T>;
	props: PropsOrUndefined<T>;
};

type SomeStep = <R>(step: <T extends SvelteComponent>(step: Step<T>) => R) => R;

export type Steps = SomeStep[];

export function makeStep<T extends SvelteComponent>(i: Step<T>): SomeStep {
	return (cb) => cb(i);
}

export interface StepperEvents {
	stepChange: {
		newIndex: number;
		/** The maximum possible index given the current steps. */
		of: number;
		direction: 'forward' | 'backward';
	};
	conclusion: null | undefined;
}
