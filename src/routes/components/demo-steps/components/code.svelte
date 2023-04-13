<script lang="ts">
  import { HighlightSvelte } from "svelte-highlight";
  import "svelte-highlight/styles/github-dark-dimmed.css";

  export let code: string;
</script>

<div class="code-wrapper">
  <HighlightSvelte {code} />
</div>

<style>
  .code-wrapper {
    border-radius: 1rem;
    overflow: scroll;
    margin: 2rem 0;
  }
</style>
