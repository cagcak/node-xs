import { beforeEach, describe, it } from "mocha";

import { DefaultState } from "../src/models";
import { StateMachine } from "../src/modules/state-machine";
import { expect } from "chai";

describe("NodeXs State Machine", () => {
  let state: DefaultState = {};
  let stateMachine: StateMachine;

  const proc = <U = DefaultState>(mode: "str" | "obj" = "obj"): any => {
    const store = process.env.STATE as string;

    if (store) {
      return mode === "str"
        ? JSON.stringify(JSON.parse(process.env.STATE as string))
        : (JSON.parse(process.env.STATE as string) as U);
    }

    return undefined;
  };

  beforeEach(() => {
    state = {
      name: "Jane",
      surname: "Doe",
    };

    stateMachine = new StateMachine(state);
  });

  it("should be able to add things correctly", () => {
    expect(state).instanceOf(Object);
    expect(stateMachine).to.not.undefined;
    expect(stateMachine.select("name")).to.be.equal("Jane");
  });

  it("should be store state object in process env", () => {
    expect(Object.keys(process.env)).includes("STATE");
    expect(proc("str")).to.equal(JSON.stringify(state));
  });

  describe("Prototype testing", () => {
    it(`should have select a specific key's value`, () => {
      expect(stateMachine.select("name")).to.be.equal("Jane");
      expect(stateMachine.select("surname")).to.not.be.equal("Jane");
      expect(stateMachine.select("surname")).to.be.equal("Doe");
    });

    it("should patch a new key-value pair into the existing state", () => {
      stateMachine.patch("age", 25);

      expect(stateMachine.select("age")).to.be.equal(25);
      expect(proc("str")).to.be.include("age");
      expect(proc("obj")?.age).to.be.equal(25);
    });

    it("should remove a slice from state", () => {
      stateMachine.clean("name");

      expect(stateMachine.select("name")).to.be.null;
    });

    it("should remove store", () => {
      stateMachine.clean();

      expect(stateMachine.select("name")).to.be.null;
      expect(proc("str")).to.be.undefined;
      expect(proc("obj")?.age).to.be.undefined;
    });
  });

  afterEach((done) => {
    done();
  });
});
