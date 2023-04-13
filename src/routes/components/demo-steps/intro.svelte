<script lang="ts">
	import { createStepController } from '$lib';
	import Button from '../button.svelte';
	import StepLayout from './components/step-layout.svelte';

	const stepController = createStepController();
</script>

<StepLayout>
	<h2>Welcome to Svelte Stepper</h2>
	<p>Svelte Stepper is a versatile Svelte component for creating beautifully-animated stepped flows in modals or wherever your heart desires.</p>
	<p>
		The library itself is completely "headless", meaning it steps through whatever components you give it, while putting you in full control
		of container- and step layout, styles and transitions.
	</p>
	<p>Check out the full documentation on <a href="https://github.com/efstajas/svelte-stepper" target="_blank">GitHub</a>.</p>
	<p>Without further ado — you're looking at a simple demo implementation right now, using default animations. Click "Next step" to step forward!</p>
	<svelte:fragment slot="actions">
		<Button variant="primary" on:click={() => stepController.nextStep()}>Next step</Button>
	</svelte:fragment>
</StepLayout>
