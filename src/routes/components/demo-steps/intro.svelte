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
		Without further ado: the flow you're on right now is using Svelte Stepper. Let's give it a go!
	</p>
	<svelte:fragment slot="actions">
		<Button variant="primary" on:click={() => stepController.nextStep()}>Next step</Button>
	</svelte:fragment>
</StepLayout>
