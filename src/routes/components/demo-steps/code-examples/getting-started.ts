export const SIMPLE_STEP = `<script lang="ts">
  import { createStepController } from '@efstajas/svelte-stepper';

  const stepController = createStepController();
</script>

<h1>My first step</h1>

<button on:click={stepController.nextStep}>Next</button>
`

export const BASIC_USAGE = `<script lang="ts">
  import { Stepper, makeStep } from '@efstajas/svelte-stepper';

  /* ... import your step components here ... */

  const exampleSteps = [
    makeStep({
      component: MyFirstStep,
      props: undefined
    }),
    makeStep({
      component: MySecondStepWithProps,
      props: {
        foo: 'bar',
      },
    }),
    makeStep({
      component: MyFinalStep,
      props: undefined
    })
  ];
</script>

<Stepper {steps} />
`
