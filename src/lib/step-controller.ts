import { createEventDispatcher } from "svelte";
import type { StepComponentEvents, Steps } from "./types";

export default () => {
  const dispatch = createEventDispatcher<StepComponentEvents>();

  function nextStep() {
    dispatch("goForward");
  }

  function previousStep() {
    dispatch("goBackward");
  }

  function move(by: number) {
    dispatch("goForward", { by });
  }

  function sidestep(steps: Steps) {
    dispatch("sidestep", { steps });
  }

  function cancelSidestep() {
    dispatch('cancelSidestep');
  }

  return {
    nextStep,
    previousStep,
    move,
    sidestep,
    cancelSidestep,
  }
};
