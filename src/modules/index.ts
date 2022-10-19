import { StateMachine } from "./state-machine";

module.exports = {
  store: (state: unknown) => new StateMachine(state),
};
