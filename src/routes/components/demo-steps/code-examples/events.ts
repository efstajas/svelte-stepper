export const EVENTS_EXAMPLE = `<Stepper
  {steps}
  on:conclusion={() => {
    alert('The last step in the flow has called stepController.nextStep()!');
  }}
  on:stepChange={(e) => {
    const { newIndex, of, direction } = e.detail;

    console.log(\`Changed to step \${newIndex + 1} of \${of} going \${direction}\`);
  }}
/>
`;
