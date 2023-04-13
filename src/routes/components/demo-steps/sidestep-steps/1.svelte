<script lang="ts">
	import { createStepController } from '$lib';
	import Button from '../../button.svelte';
	import StepLayout from '../components/step-layout.svelte';

	const stepController = createStepController();
</script>

<StepLayout>
	<h2>First Sidestep step</h2>
	<p>Great, we've just entered a sidestep flow.</p>
	<p>
		This sidestep flow is just two steps. Move forward to continue.
	</p>
	<svelte:fragment slot="actions">
		<Button variant="primary" on:click={() => stepController.nextStep()}>Next step</Button>
	</svelte:fragment>
</StepLayout>
