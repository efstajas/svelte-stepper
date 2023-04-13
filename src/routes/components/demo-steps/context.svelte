<script lang="ts">
	import Button from '../button.svelte';
	import StepLayout from './components/step-layout.svelte';
	import { createStepController } from '$lib';
	import Code from './components/code.svelte';
	import { DEFINE_CONTEXT, USE_CONTEXT } from './code-examples/context';

	const stepController = createStepController();
</script>

<StepLayout>
	<h2>Context API</h2>
	<p>
		Stepped flows frequently collect a bunch of data from the user over multiple steps, and submit
		it at the end.
	</p>
	<p>
		For exactly this use-case, Svelte Stepper comes with a context system. It allows you to
		conveniently share a single Svelte <span class="typo-inline-code">writable</span> store between all
		steps.
	</p>
	<p>
		To define context, simply write a function that returns a Svelte <span class="typo-inline-code"
			>writable</span
		> store, and pass it to the Stepper component:
	</p>
	<Code code={DEFINE_CONTEXT} />
	<p>
		In this particular example, we're exporting the type of our context writable from a module, so
		that we can properly type the context writable in our step components later.
	</p>
	<p>
		Passing <span class="typo-inline-code">context</span> to the Stepper will make it automatically
		available to all steps as a <span class="typo-inline-code">context</span> prop:
	</p>
	<Code code={USE_CONTEXT} />
	<p>
		Using this method, you can incrementally populate a store of data throughout multiple steps.
	</p>
	<svelte:fragment slot="actions">
		<Button variant="ghost" on:click={stepController.previousStep}>Go back</Button>
		<Button variant="primary" on:click={stepController.nextStep}>Next step</Button>
	</svelte:fragment>
</StepLayout>
