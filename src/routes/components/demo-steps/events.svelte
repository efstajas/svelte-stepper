<script lang="ts">
	import Button from '../button.svelte';
	import StepLayout from './components/step-layout.svelte';
	import { createStepController } from '$lib';
	import Code from './components/code.svelte';
	import { EVENTS_EXAMPLE } from './code-examples/events';

	const stepController = createStepController();
</script>

<StepLayout>
	<h2>Stepper Events</h2>
	<p>
		The Stepper component emits events allowing you to react to a step change or
    conclusion of the flow.
	</p>
  <Code code={EVENTS_EXAMPLE} />
  <p>
    The <span class="typo-inline-code">stepChange</span> event is emitted when the stepper moves to
    a new step. It includes metadata on the current step index, the total amount of steps, as well as
    the direction of the change.
  </p>
  <p>
    The <span class="typo-inline-code">conclusion</span> event is emitted when the stepper has
    reached the last step and <span class="typo-inline-code">nextStep</span> is called.
  </p>
	<svelte:fragment slot="actions">
		<Button variant="ghost" on:click={stepController.previousStep}>Go back</Button>
		<Button variant="primary" on:click={stepController.nextStep}>Next step</Button>
	</svelte:fragment>
</StepLayout>
