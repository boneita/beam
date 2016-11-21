export const RUN_COMMAND = 'RUN_COMMAND';

export function runCommand(text) {
  return { type: RUN_COMMAND, text };
}
