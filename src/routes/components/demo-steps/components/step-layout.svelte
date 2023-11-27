<script>
  import ActionRow from './action-row.svelte';
</script>

<div class="step-layout">
  <div class="content">
    <slot />
  </div>
  <div class="actions">
    <ActionRow>
      <slot name="actions" />
    </ActionRow>
  </div>
</div>

<style>
  .step-layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
