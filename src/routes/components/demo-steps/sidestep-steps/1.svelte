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
		Within a sidestep, you can use the usual <span class="typo-inline-code">nextStep</span> and <span class="typo-inline-code">previousStep</span> methods to navigate between steps.
    Once you reach the end of the sidestep flow, the stepper will automatically navigate back to the original flow.
	</p>
  <p>
		You can also cancel a sidestep anywhere within the sidestep flow by calling <span class="typo-inline-code">stepController.cancelSidestep()</span>.
    Try it out! The following button is going to cancel the sidestep early.
	</p>
  <Button variant="primary" on:click={() => stepController.cancelSidestep()}>Cancel sidestep</Button>
	<svelte:fragment slot="actions">
		<Button variant="primary" on:click={() => stepController.nextStep()}>Next step</Button>
	</svelte:fragment>
</StepLayout>
