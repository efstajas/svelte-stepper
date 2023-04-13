<script lang="ts">
	import Button from '../button.svelte';
	import StepLayout from './components/step-layout.svelte';
	import { createStepController } from '$lib';

	const controller = createStepController();
</script>

<StepLayout>
	<h2>Features</h2>
	<p>
		Svelte Stepper comes with a lot of built-in functionality, while still remaining easy-to-use at
		its core.
	</p>

	<h4>Simple & safe</h4>
	<p>
		Svelte Stepper is written entirely in TypeScript, and all its interfaces are fully type-safe out
		of the box. To get started, all you need to do is provide a sequence of Svelte components as
		steps. Every step can receive custom props.
	</p>

	<h4>Animations</h4>
	<p>
		Did you see that step transition when you clicked "Next" just now? Svelte Stepper automatically
		transitions steps in a delightful way, and even smoothly adjusts its height to match each new
		step component. Of course, you can fully customize all animation parameters.
	</p>

	<h4>Context & multi-step forms</h4>
	<p>
		Svelte Stepper includes a full context API, which allows you to share data between steps. This
		enables advanced usecases like building up form data over several steps, and submitting it at
		the end.
	</p>

	<svelte:fragment slot="actions">
		<Button variant="ghost" on:click={controller.previousStep}>Go back</Button>
		<Button variant="primary" on:click={controller.nextStep}>Next step</Button>
	</svelte:fragment>
</StepLayout>
