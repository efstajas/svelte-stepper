<script lang="ts">
	import Button from '../button.svelte';
	import Code from './components/code.svelte';
	import StepLayout from './components/step-layout.svelte';

	import { createStepController } from '$lib';
	import { CUSTOM_DURATION } from './code-examples/animations';
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

	<p>
		You can customize the default transition duration, or even set fully custom transition
		functions. Check out the <a href="https://github.com/efstajas/svelte-stepper" target="_blank"
			>full documentation on GitHub</a
		> to learn how. As a quick example, you can edit the transition duration of this stepper by moving
		the slider below. Try it out!
	</p>

	<Code code={CUSTOM_DURATION($context.defaultTransitionDuration)} />

	<input type="range" min="0" max="2000" step="1" bind:value={$context.defaultTransitionDuration} />

	<svelte:fragment slot="actions">
		<Button variant="ghost" on:click={stepController.previousStep}>Go back</Button>
		<Button variant="primary" on:click={stepController.nextStep}>Next step</Button>
	</svelte:fragment>
</StepLayout>
