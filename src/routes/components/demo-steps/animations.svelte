<script lang="ts">
	import Button from '../button.svelte';
	import Code from './components/code.svelte';
	import StepLayout from './components/step-layout.svelte';

	import { createStepController } from '$lib';
	import { CUSTOM_ANIMATIONS, CUSTOM_DURATION } from './code-examples/animations';
	import type { ExampleStepperContext } from '../../+page.svelte';
	import type { Writable } from 'svelte/store';

	export let context: Writable<ExampleStepperContext>;

	const stepController = createStepController();
</script>

<StepLayout>
	<h2>Animations</h2>

	<p>
		As you probably already noticed, Svelte Stepper automatically transitions between your steps
		with a sleek animation by default. Of course, you can fully customize the entry- and exit
		transitions for steps.
	</p>

	<h4>Customizing the transition duration</h4>
	<p>
		If all you want to do is change the duration of the default transition, you can pass a <span
			class="typo-inline-code">defaultTransitionDuration</span
		> prop to the stepper. Out of the box, it's set to 300 milliseconds. This prop controls the speed
		of the stepper container height transition, as well as the step's entry- and exit transitions.
	</p>

	<Code code={CUSTOM_DURATION($context.defaultTransitionDuration)} />

	<p>
		Try it out! You can change this slider to update the
		<span class="typo-inline-code">defaultTransitionDuration</span> prop of this stepper. Navigate to
		the previous or next screens to see the effect.
	</p>

	<input type="range" min="0" max="2000" step="1" bind:value={$context.defaultTransitionDuration} />

	<h4>Using custom transition functions</h4>
	<p>
		If you want to set fully custom transitions, you can set the
		<span class="typo-inline-code">stepIntroTransition</span> and
		<span class="typo-inline-code">stepOutroTransition</span> props on the stepper.
	</p>

	<Code code={CUSTOM_ANIMATIONS} />

	<p>
		These props accept an object with <span class="typo-inline-code">transitionFn</span> and
		<span class="typo-inline-code">params</span> properties. Pass any standard Svelte transition
		function, and set any custom parameters for it. The <span class="typo-inline-code">params</span>
		property accepts a function with an optional <span class="typo-inline-code">direction</span> parameter,
		allowing you to alter the transition parameters based on whether the user is currently navigating
		forward or backward within the flow.
	</p>

	<svelte:fragment slot="actions">
		<Button variant="ghost" on:click={stepController.previousStep}>Go back</Button>
		<Button variant="primary" on:click={stepController.nextStep}>Next step</Button>
	</svelte:fragment>
</StepLayout>
