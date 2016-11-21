import { RUN_COMMAND } from '../actions/command';

export default function runCommand(command = {}, action) {
  switch (action.type) {

    case RUN_COMMAND:
      return {...command, ...{text: action.text} };

    default:
      return command;
  }
}
