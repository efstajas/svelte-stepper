<script lang="ts">
	import { createStepController } from '$lib';
	import Button from '../button.svelte';
	import Code from './components/code.svelte';
	import StepLayout from './components/step-layout.svelte';

	const stepController = createStepController();
</script>

<StepLayout>
	<h2>Installation</h2>
	<p>Svelte Stepper is available on NPM.</p>
	<p>
		Install with the NPM CLI:
	</p>
  <Code code="npm install @efstajas/svelte-stepper" />
  <p>
		Or using yarn:
	</p>
  <Code code="yarn add @efstajas/svelte-stepper" />
  <svelte:fragment slot="actions">
		<Button on:click={stepController.previousStep}>Go back</Button>
    <Button variant="primary" on:click={stepController.nextStep}>Next step</Button>
	</svelte:fragment>
</StepLayout>
