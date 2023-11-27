<script lang="ts">
  import { createStepController } from '$lib';
  import Button from '../button.svelte';
  import StepLayout from './components/step-layout.svelte';

  const stepController = createStepController();
</script>

<StepLayout>
  <h2>That's it!</h2>
  <p>Hopefully you've enjoyed this little demo.</p>
  <p>Please free to leave a star on my repo and check back for new features soon!</p>
  <svelte:fragment slot="actions">
    <Button on:click={() => stepController.previousStep()}>Go back</Button>
    <Button on:click={() => stepController.move(-4)}>Restart</Button>
  </svelte:fragment>
</StepLayout>
