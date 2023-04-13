export const DEFINE_CONTEXT = `<script lang="ts" context="module">
  export interface MyExampleStepperContext {
    foo: string;
    bar: number;
  }
</script>

<script lang="ts">
  import { Stepper, makeStep } from '@efstajas/svelte-stepper';

  /* ... import your step components here ... */

  const exampleSteps = [
    makeStep({
      component: MyFirstStep,
      props: undefined
    }),
  ];

  const context: () => Writable<MyExampleStepperContext> = () => writable({
    foo: 'bar',
    bar: 42,
  });
</script>

<Stepper {steps} {context} />
`;

export const USE_CONTEXT = `<script lang="ts">
  import { Writable } from 'svelte/store';
  import { MyExampleStepperContext } from './my-stepper-page.svelte';
  import { createStepController } from '@efstajas/svelte-stepper';

  const stepController = createStepController<MyExampleStepperContext>();

  export let context: Writable<MyExampleStepperContext>;
</script>

<h1>My first step</h1>

<p>
  Foo is {$context.foo} and bar is {$context.bar}.
</p>

<button on:click={context.update((v) => ({ ...v, bar: v.bar + 1}))}>Increment bar</button>

<button on:click={stepController.nextStep}>Next</button>
`;
