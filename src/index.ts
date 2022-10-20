import { Select } from "./decorators";
import { StateMachine } from "./modules";

export = {
  Store: (state: unknown) => new StateMachine(state),
  Select,
};
