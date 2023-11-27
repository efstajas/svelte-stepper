# 🚶 Svelte Stepper

![GIF of Svelte Stepper in action](https://github.com/efstajas/svelte-stepper/raw/main/docs/demo.gif)

A simple library for building delightfully animated stepped flows with Svelte. Svelte Stepper is completely "headless", meaning it steps through whatever components you give it, putting you in full control of container- and step layout, styles and transitions.

## 🌍 Interactive demo & docs

Check out an simple demo implementation at [svelte-stepper.jason-e.dev](https://svelte-stepper.jason-e.dev/).

You can find the code for the above at `/src/routes` in this repo as a usage example.

## ✨ Features

Svelte Stepper comes with a lot of built-in functionality, while still remaining easy-to-use at its core.

### Simple & type-safe

Svelte Stepper is written entirely in TypeScript, and all its interfaces are fully type-safe out of the box. To get started, all you need to do is provide a sequence of Svelte components as steps. Every step can receive custom props.

### Delightful animations

Svelte Stepper automatically transitions steps in a delightful way, and even smoothly adjusts its height to match each new step component. Of course, you can fully customize all animations.

### Context & multi-step forms

Svelte Stepper includes a full context API, which allows you to share data between steps. This enables advanced usecases like building up form data over several steps, and submitting it at the end.

## 💾 Installation

Install with NPM or yarn:

```bash
npm install @efstajas/svelte-stepper
```

```bash
yarn add @efstajas/svelte-stepper
```

## 👋 Getting started

Getting a simple flow going is easy. First, let's create a few Step components.

### Creating Steps

A step is simply a normal Svelte component, which can dispatch a number of special events in order to communicate with the stepper. Here's a very simple step with some text and a button that advances the flow to the next step:

```ts
<script lang="ts">
  import { createStepController } from '@efstajas/svelte-stepper';

  const stepController = createStepController();
</script>

<h1>My first step</h1>

<button on:click={stepController.nextStep}>Next</button>
```

As you can see, Svelte Stepper exposes a `createStepController` function, which you can use to create a `stepController`. This object contains a number of functions for communicating with the stepper, such as `nextStep` and `previousStep`.

Go ahead and create two simple step components so that we can move on to creating our first flow.

### Initializing the Stepper

Getting a simple flow going is easy. The core of Svelte Stepper is the `Stepper` component. Simply import it into your page, and provide an array of your steps using the `makeStep` utility.

```ts
<script lang="ts">
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

<Stepper steps={exampleSteps} />
```

As you can see, you can pass props to your step components using the `props` property. The type of this property is automatically inferred from the provided step component.

Congratulations! This is everything you need to build a simple flow. Let's have a look at some more advanced features.

### A note on padding

The stepper component automatically hides step overflow during transitions in order to prevent steps from overflowing the container during transition, which doesn't look very nice. If you want to add padding around your steps, please pass a `padding` prop to the Stepper component, instead of wrapping the container in a padded element. This ensures that transitions aren't visually cut off by the step container.

## 🎥 Animations

Svelte Stepper automatically transitions between your steps with a sleek animation by default. Of course, you can fully customize the entry- and exit transitions for steps.

### Customizing the transition duration

If all you want to do is change the duration of the default transition, you can pass a `defaultTransitionDuration` prop to the stepper. Out of the box, it's set to 300 milliseconds. This prop controls the speed of the stepper container height transition, as well as the step's entry- and exit transitions.

```ts
<Stepper
  steps={exampleSteps}
  defaultTransitionDuration={1000}
/>
```

### Using custom transition functions and -parameters

If you want to set fully custom transitions, you can set the `stepIntroTransition` and `stepOutroTransition` props on the stepper.

```ts
<Stepper
  steps={exampleSteps}
  defaultTransitionDuration={600}
  stepOutroTransition={{
    transitionFn: scale,
    params: () => ({
      duration: 600,
      delay: 0,
      scale: 1,
    }),
  }}
  stepIntroTransition={{
    transitionFn: fly,
    params: (direction) => ({
      duration: 600,
      delay: 0,
      x: direction === 'forward' ? 100 : -100,
    }),
  }}
/>
```

These props accept an object with `transitionFn` and `params` properties. Pass any standard Svelte transition function, and set any custom parameters for it. The `params` property accepts a function with an optional `direction` parameter, allowing you to alter the transition parameters based on whether the user is currently navigating forward or backward within the flow.

## 💽 Context API

Stepped flows frequently collect a bunch of data from the user over multiple steps, and submit it at the end. For exactly this use-case, Svelte Stepper comes with a context system. It allows you to conveniently share a single Svelte `writable` store between all steps.

To define context, simply write a function that returns a Svelte `writable` store, and pass it to the Stepper component:

```ts
<script lang="ts" context="module">
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

  const exampleContext: () => Writable<MyExampleStepperContext> = () => writable({
    foo: 'bar',
    bar: 42,
  });
</script>

<Stepper steps={exampleSteps} context={exampleContext} />
```

In this particular example, we're exporting the type of our context writable from a module, so that we can properly type the context writable in our step components later.

Passing `context` to the Stepper will make it automatically available to all steps as a `context` prop:

```ts
<script lang="ts">
  import { Writable } from 'svelte/store';
  import { MyExampleStepperContext } from './my-stepper-page.svelte';
  import { createStepController } from '@efstajas/svelte-stepper';

  const stepController = createStepController();

  export let context: Writable<MyExampleStepperContext>;
</script>

<h1>My first step</h1>

<p>
  Foo is {$context.foo} and bar is {$context.bar}.
</p>

<button on:click={context.update((v) => ({ ...v, bar: v.bar + 1}))}>Increment bar</button>

<button on:click={stepController.nextStep}>Next</button>
```

Using this method, you can incrementally populate a store of data throughout multiple steps.

## 📬 Stepper Events

The Stepper component emits events allowing you to react to a step change or conclusion of the flow.

```ts

<Stepper
  steps={exampleSteps}
  on:conclusion={() => {
    alert('The last step in the flow has called stepController.nextStep()!');
  }}
  on:stepChange={(e) => {
    const { newIndex, of, direction } = e.detail;

    console.log(\`Changed to step \${newIndex + 1} of \${of} going \${direction}\`);
  }}
/>
```

The `stepChange` event is emitted when the stepper moves to a new step. It includes metadata on the current step index, the total amount of steps, as well as the direction of the change.

The `conclusion` event is emitted when the stepper has reached the last step and `nextStep` is called.

## 🕺 Side-Steps

Sometimes, you may need to temporarily switch to a different set of steps within a flow. Svelte Stepper includes `sidestep` functionality for this purpose. Using a side-step, you can easily temporarily launch a different flow, and come back to the original flow at the end.

To trigger a side-step, simply call `stepController.sidestep(steps)` within a step component, where `steps` is an array of new steps:

```ts
<script lang="ts">
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
```

Within a sidestep, you can use the usual `nextStep` and `previousStep` methods to navigate between steps. Once you reach the end of the sidestep flow, the stepper will automatically navigate back to the original flow.

You can also cancel a sidestep anywhere within the sidestep flow by calling `stepController.cancelSidestep()`. This will end the sidestep flow immediately, and navigate back to where the sidestep was triggered from within the original flow.
