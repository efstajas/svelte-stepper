<script context="module" lang="ts">
	export interface ExampleStepperContext {
		defaultTransitionDuration: number;
	}
</script>

<script lang="ts">
	import './styles.css';

	import { makeStep } from '$lib';
	import Stepper from '$lib/stepper.svelte';
	import Intro from './components/demo-steps/intro.svelte';
	import Features from './components/demo-steps/features.svelte';
	import Animations from './components/demo-steps/animations.svelte';
	import ProgressBar from './components/progress-bar.svelte';
	import { writable, type Writable } from 'svelte/store';
	import Outro from './components/demo-steps/outro.svelte';
	import Sidestep from './components/demo-steps/sidestep.svelte';

	let context: Writable<ExampleStepperContext>;
	const stepperContext = () => {
		const w = writable<ExampleStepperContext>({
			defaultTransitionDuration: 500
		});

		context = w;

		return w;
	};

	const exampleSteps = [
		makeStep({
			component: Intro,
			props: undefined
		}),
		makeStep({
			component: Features,
			props: undefined
		}),
		makeStep({
			component: Animations,
			props: undefined
		}),
		makeStep({
			component: Sidestep,
			props: undefined
		}),
		makeStep({
			component: Outro,
			props: undefined
		}),
	];

	let stepsMaxIndex = exampleSteps.length - 1;
	let currIndex = 0;

	let stepperWrapperElem: HTMLDivElement;
</script>

<svelte:head>
	<title>Svelte Stepper</title>
</svelte:head>

<div class="wrapper">
	<div class="logo">
		<a class="typo-header-3" href="https://github.com/efstajas/svelte-stepper" target="_blank">Svelte Stepper</a>
	</div>
	<div class="modal">
    <ProgressBar max={stepsMaxIndex} curr={currIndex} duration={$context?.defaultTransitionDuration} />
		<div class="stepper-wrapper" bind:this={stepperWrapperElem}>
			<Stepper
				context={stepperContext}
				steps={exampleSteps}
				on:stepChange={(e) => {
					const { detail } = e;
					currIndex = detail.newIndex;
					stepsMaxIndex = detail.of;

					stepperWrapperElem.scrollTo({
						top: 0,
						behavior: 'smooth'
					});
				}}
				padding="2rem"
				defaultTransitionDuration={$context?.defaultTransitionDuration}
			/>
		</div>
	</div>
	<div class="credits">
		<p class="typo-text-small">Built by Jason Efstathiou • </p>
		<a class="typo-text-small" href="https://github.com/efstajas/svelte-stepper" target="_blank">Svelte Stepper on GitHub</a>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: calc(100vh - 4rem);
		padding: 2rem 0.5rem;
	}

	.logo a {
		text-decoration: none;
		color: var(--color-foreground);
	}

	.modal {
		background-color: var(--color-background);
		width: 100%;
		max-width: 48rem;
    border-radius: 1rem;
		border: 1px solid var(--color-primary);
    position: relative;
    overflow: hidden;
	}

	.stepper-wrapper {
		overflow: scroll;
    max-height: calc(100vh - 12rem);
		position: relative;
	}

	.credits {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.credits a {
		text-decoration: underline;
	}
</style>
