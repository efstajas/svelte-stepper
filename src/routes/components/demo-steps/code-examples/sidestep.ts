export const SIDESTEP = `<script lang="ts">
  import { createStepController } from '@efstajas/svelte-stepper';

  import MyFirstSidestepStep from './my-first-sidestep-step.svelte';

  const stepController = createStepController();
</script>

<h1>Launching a sidestep</h1>

<button on:click={() => stepController.sidestep([
  makeStep({
    component: MyFirstSidestepStep,
    props: undefined
  }),
])}>Start sidestep</button>
`
