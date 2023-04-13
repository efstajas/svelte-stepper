<script lang="ts">
  import Highlight from "svelte-highlight";
  import typescript from "svelte-highlight/languages/typescript";
  import "svelte-highlight/styles/github-dark-dimmed.css";

  export let code: string;
</script>

<div class="code-wrapper">
  <Highlight language={typescript} {code} />
</div>

<style>
  .code-wrapper {
    border-radius: 1rem;
    overflow: scroll;
    margin: 2rem 0;
  }
</style>
