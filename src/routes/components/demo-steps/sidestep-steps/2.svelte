<script lang="ts">
	import { createStepController } from '$lib';
	import Button from '../../button.svelte';
	import StepLayout from '../components/step-layout.svelte';

	const stepController = createStepController();
</script>

<StepLayout>
	<h2>Second sidestep step</h2>
	<p>This is the last step in the sidestep, so clicking "Next step" is going to take us back to the original flow.</p>
	<svelte:fragment slot="actions">
    <Button variant="primary" on:click={() => stepController.previousStep()}>Go back</Button>
		<Button variant="primary" on:click={() => stepController.nextStep()}>Next step</Button>
	</svelte:fragment>
</StepLayout>
