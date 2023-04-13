<script lang="ts">
	import Button from '../button.svelte';
	import Code from './components/code.svelte';
	import StepLayout from './components/step-layout.svelte';

	import { BASIC_USAGE, SIMPLE_STEP } from './code-examples/getting-started';
	import { createStepController } from '$lib';

	const stepController = createStepController();
</script>

<StepLayout>
	<h2>Getting started</h2>
	<p>Getting a simple flow going is easy. First, let's create a few Step components.</p>

	<h4>Creating Steps</h4>
	<p>
		A step is simply a normal Svelte component, which can dispatch a number of special events in
		order to communicate with the stepper. Here's a very simple step with some text and a button
		that advances the flow to the next step:
	</p>

	<Code code={SIMPLE_STEP} />

	<p>
		As you can see, Svelte Stepper exposes a <span class="typo-inline-code"
			>createStepController</span
		>
		function, which you can use to create a <span class="typo-inline-code">stepController</span>.
		This object contains a number of functions for communicating with the stepper, such as
		<span class="typo-inline-code">nextStep</span>
		and <span class="typo-inline-code">previousStep</span>.
	</p>

	<p>
		Go ahead and create two simple step components so that we can move on to creating our first
		flow.
	</p>

	<h4>Initializing the Stepper</h4>
	<p>
		Getting a simple flow going is easy. The core of Svelte Stepper is the <span
			class="typo-inline-code">Stepper</span
		>
		component. Simply import it into your page, and provide an array of your steps using the
		<span class="typo-inline-code">makeStep</span> utility.
	</p>

	<Code code={BASIC_USAGE} />

	<p>
		As you can see, you can pass props to your step components using the <span
			class="typo-inline-code">props</span
		> property. The type of this property is automatically inferred from the provided step component.
	</p>

	<p>
		Congratulations! This is everything you need to build a simple flow. Let's have a look at some
		more advanced features.
	</p>

  <h4>A note on padding</h4>
  <p>
    The stepper component automatically hides step overflow during transitions in order to prevent
    steps from overflowing the container during transition, which doesn't look very nice. If you want
    to add padding around your steps, please pass a <span class="typo-inline-code">padding</span> prop
    to the Stepper component, instead of wrapping the container in a padded element. This ensures that
    transitions aren't visually cut off by the step container.
  </p>

	<svelte:fragment slot="actions">
		<Button variant="ghost" on:click={stepController.previousStep}>Go back</Button>
		<Button variant="primary" on:click={stepController.nextStep}>Next step</Button>
	</svelte:fragment>
</StepLayout>
