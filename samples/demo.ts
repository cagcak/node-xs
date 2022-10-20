import { Select, Store } from "../dist/lib";

import { StateMachine } from "../dist/lib/modules";

const STATE = {
  id: 234,
  mail: "test@mail.com",
  mode: "edit",
};

class SampleClass {
  @Select(STATE)
  mode: any;

  state: StateMachine<{ mode: number }>;

  constructor(private store: typeof Store) {
    this.state = this.store({ mode: 2 });
    const slice = this.mode;
  }
}

const instance = new SampleClass(Store);
const mode = instance.state.select("mode");
const selectedSlice = instance.mode;

const result = { mode, selectedSlice };
