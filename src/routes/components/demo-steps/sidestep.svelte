<script lang="ts">
  import { createStepController, makeStep } from '$lib';
  import Button from '../button.svelte';
  import StepLayout from './components/step-layout.svelte';

  import SidestepStep1 from './sidestep-steps/1.svelte';
  import SidestepStep2 from './sidestep-steps/2.svelte';

  const stepController = createStepController();
</script>

<StepLayout>
  <h2>Side-steps</h2>
  <p>
    Sometimes, you may need to temporarily switch to a different set of steps within a flow. Svelte
    Stepper includes <span class="typo-inline-code">sidestep</span> functionality for this purpose. Using
    a side-step, you can easily temporarily launch a different flow, and come back to the original flow
    at the end.
  </p>
  <p>
    Try it out! The following button is going to launch a short side-step flow, at the end of which
    you'll land back here.
  </p>
  <Button
    variant="primary"
    on:click={() =>
      stepController.sidestep([
        makeStep({
          component: SidestepStep1,
          props: undefined
        }),
        makeStep({
          component: SidestepStep2,
          props: undefined
        })
      ])}>Trigger sidestep</Button
  >
  <svelte:fragment slot="actions">
    <Button on:click={stepController.previousStep}>Go back</Button>
    <Button variant="primary" on:click={stepController.nextStep}>Next step</Button>
  </svelte:fragment>
</StepLayout>
