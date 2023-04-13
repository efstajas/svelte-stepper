<script lang="ts">
	import { fly, type TransitionConfig } from 'svelte/transition';
	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
	import type { Steps, MovePayload, SidestepPayload, StepperEvents } from './types';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { BROWSER } from 'esm-env';

	const dispatch = createEventDispatcher<StepperEvents>();

	export let steps: Steps;

	// Context props
	type CT = $$Generic;
	type CW = $$Generic<(() => Writable<CT>) | undefined>;
	export let context: CW | undefined = undefined;
	const resolvedContext = context?.();

	// Handler props
	export let onConclusion: ((ctx: typeof resolvedContext) => void) | undefined = undefined;

	// Style props
	export let padding: string | undefined = undefined;

	// Animation props
	export let defaultTransitionDuration = 500;
	export let disableTransitions = false;

	interface TransitionAndParams<TP> {
		transitionFn: (node: Element, params: TP) => TransitionConfig;
		params: (direction: 'forward' | 'backward') => TP;
	}

	export let stepIntroTransition: TransitionAndParams<Record<string, unknown>> = {
		transitionFn: fly,
		params: (direction) => getTransitionParams('in', direction)
	};
	$: introTransition = stepIntroTransition.transitionFn;
	$: introTransitionParams = stepIntroTransition.params;

	export let stepOutroTransition: TransitionAndParams<Record<string, unknown>> = {
		transitionFn: fly,
		params: (direction) => getTransitionParams('out', direction)
	};
	$: outroTransition = stepOutroTransition.transitionFn;
	$: outroTransitionParams = stepOutroTransition.params;

	let stepElement: HTMLDivElement;

	let internalSteps = steps;
	$: resolvedSteps = internalSteps.map((someStep) => someStep((i) => i));

	let currentStepIndex = 0;
	$: currentStep = resolvedSteps[currentStepIndex];
	$: dispatch('stepChange', {
		newIndex: currentStepIndex,
		of: resolvedSteps.length - 1,
		direction
	});

	let direction: 'forward' | 'backward' = 'forward';

	/**
	 * Advances `by` amount of steps in the flow (or goes backwards with a negative number).
	 * Resolves when the step transition has concluded fully.
	 * @param by The amount of steps to move by.
	 */
	async function move(by: number) {
		if (!resolvedSteps[currentStepIndex + by]) {
			handleConclusion();
			return;
		}

		direction = by > 0 ? 'forward' : 'backward';

		currentStepIndex += by;

		// Wait for the old step to be fully out of view and unmounted.
		return new Promise<void>((resolve) => (transitionEndListener = resolve));
	}

	function getTransitionParams(inOrOut: 'in' | 'out', direction: 'forward' | 'backward') {
		if (disableTransitions) return { x: 0, duration: 0 };

		let x;

		if (inOrOut === 'in') {
			x = direction === 'forward' ? 128 : -128;
		} else {
			x = direction === 'forward' ? -128 : 128;
		}

		return { x, duration: defaultTransitionDuration, easing: cubicInOut };
	}

	let transitioning = false;
	let transitionEndListener: (() => void) | undefined = undefined;

	function setTransitioning(newVal: boolean) {
		if (newVal === false) transitionEndListener?.();
		transitioning = newVal;
	}

	let containerHeight = tweened(0);

	let resizeObserver = BROWSER ? new ResizeObserver(() => updateContainerHeight()) : undefined;
	let observedElement: HTMLDivElement | undefined;

	async function updateMutationObserver() {
		await tick();

		resizeObserver?.disconnect();

		if (BROWSER && stepElement instanceof HTMLDivElement) {
			observedElement = stepElement;
			resizeObserver?.observe(stepElement);
			updateContainerHeight();
		}
	}

	let firstHeightUpdate = true;
	async function updateContainerHeight() {
		if (!observedElement) return;

		const stepHeight = observedElement.offsetHeight;

		containerHeight.set(stepHeight, {
			duration: firstHeightUpdate || !transitioning ? 0 : defaultTransitionDuration,
			easing: cubicInOut
		});

		firstHeightUpdate = false;
	}

	function handleGoForward(event: CustomEvent<MovePayload>) {
		move(event.detail?.by ?? 1);
	}

	let sidestepConfig: SidestepPayload | undefined = undefined;
	let originalSteps: Steps | undefined = undefined;
	let originalStepIndex: number | undefined = undefined;

	async function handleSidestep(event: CustomEvent<SidestepPayload>) {
		if (sidestepConfig) throw new Error("There's already an active sidestep");

		originalStepIndex = currentStepIndex;
		sidestepConfig = event.detail;
		originalSteps = [...steps];

		/*
    Temporarily replace the steps array with one where the sidestep-triggering
    step is at index 0, followed by all side-steps.
    */
		internalSteps = [steps[currentStepIndex], ...event.detail.steps];
		currentStepIndex = 0;

		// Animate to the first side-step
		await move(1);

		/*
    Replace the step array with all side-steps only, while transitions are disabled.
    */
		disableTransitions = true;
		internalSteps = [...event.detail.steps];
		currentStepIndex = 0;

		await tick();

		disableTransitions = false;
	}

	function handleCancelSidestep() {
		if (!sidestepConfig) throw new Error("There's currently no active sidestep to cancel");
		handleConclusion();
	}

	async function handleConclusion() {
		if (sidestepConfig && originalStepIndex !== undefined && originalSteps) {
			// End the sidestep and go back to the main flow.

			// Temporarily add the sidestep-triggering step one index before the current side-step.
			internalSteps = [originalSteps[originalStepIndex], internalSteps[currentStepIndex]];
			currentStepIndex = 1;

			await tick();

			// Animate to the sidestep-triggering step.
			await move(-1);

			/* While transitions are disabled, restore the original state of the step array. */
			disableTransitions = true;

			internalSteps = originalSteps;
			currentStepIndex = originalStepIndex;

			await tick();

			sidestepConfig = undefined;
			originalSteps = undefined;
			originalStepIndex = undefined;
			disableTransitions = false;
		} else {
			onConclusion?.(resolvedContext);
		}
	}

	$: {
		currentStep;
		updateMutationObserver();
	}

	onMount(() => {
		const windowResizeListener = () => updateContainerHeight();
		window.addEventListener('resize', windowResizeListener);

		return () => window.removeEventListener('resize', windowResizeListener);
	});

	onDestroy(() => resizeObserver?.disconnect());
</script>

<div
	class="container"
	style:height={`${$containerHeight}px`}
	style:overflow={transitioning ? 'hidden' : 'visible'}
>
	{#key `${currentStepIndex}`}
		<div
			in:introTransition|local={introTransitionParams(direction)}
			out:outroTransition|local={outroTransitionParams(direction)}
			on:outrostart={() => setTransitioning(true)}
			on:introend={() => setTransitioning(false)}
			class="step-container"
		>
			<div class="step" bind:this={stepElement} style:padding>
				<svelte:component
					this={currentStep.component}
					on:goForward={handleGoForward}
					on:goBackward={(e) => move(e.detail?.by ?? -1)}
					on:sidestep={handleSidestep}
					on:cancelSidestep={handleCancelSidestep}
					{currentStepIndex}
					{...currentStep.props}
					context={resolvedContext}
				/>
			</div>
		</div>
	{/key}
</div>

<style>
	.container {
		position: relative;
	}

	.step-container {
		position: absolute;
		width: 100%;
	}

	@media only screen and (max-width: 54rem) {
		.step {
			padding: 1rem;
		}
	}
</style>
