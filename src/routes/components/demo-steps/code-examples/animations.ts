export const CUSTOM_DURATION = (duration: number) => `<Stepper
  steps={exampleSteps}
  defaultTransitionDuration={${duration}}
/>
`

export const CUSTOM_ANIMATIONS = `<Stepper
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
`
