<script lang="ts">
  export let style: string | undefined = undefined;
</script>

<svg
  style={`flex-shrink: 0; ${style ? style : ""}`}
  width="24"
  height="24"
  fill="var(--color-foreground-level-5)"
  viewBox={`0 0 24 24`}
  xmlns="http://www.w3.org/2000/svg">
  <slot />
</svg>
