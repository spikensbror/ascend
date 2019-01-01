/* tslint:disable:max-classes-per-file */

import { expect } from "chai";
import "mocha";

import {
  ascend,
  DecoratedExampleServiceImpl,
  SimpleDecoratedDependencyService,
} from "./integration/ascender";

import {
  DecoratedDependencyService,
  DecoratedExampleService,
  NotRegisteredService,
} from "./integration/shared";

import {
  IBootstrapper,
  Registrator,
  Service,
} from "../src";

import {
  implementations as implementations,
} from "../src/decorators/Implements";

describe("integration-test configured ascend resolver", () => {
  it("resolves the requested service and its dependencies as singleton", () => {
    const resolver = ascend();

    // Resolve service, ensure that it is of the expected implementation type
    // and that we will always get the same instance from the resolver.

    const service = resolver.resolve(DecoratedExampleService);

    expect(service).to.be.an.instanceOf(DecoratedExampleServiceImpl);
    expect(service).to.equal(resolver.resolve(DecoratedExampleService));

    // Verify the service dependencies.

    const impl = service as DecoratedExampleServiceImpl;

    expect(impl.decorated).to.equal(resolver.resolve(DecoratedDependencyService));
    expect(impl.simple).to.equal(resolver.resolve(SimpleDecoratedDependencyService));
  });

  describe("throws error", () => {
    let addedImplementations: Function[] = [];

    afterEach(() => {
      // Remove any added services and clear the array.

      addedImplementations.forEach((i: Function) => {
        const index = implementations.indexOf(i);
        if (index < 0) {
          return;
        }

        implementations.splice(index, 1);
      });

      addedImplementations = [];
    });

    it("when trying to resolve unregistered service", () => {
      const resolver = ascend();

      expect(() => resolver.resolve(NotRegisteredService)).to.throw();
    });

    it("when registration with unregistered dependencies has been made", () => {
      class B {
        //
      }

      @Service
      class A {
        public constructor(test: B) {
          //
        }
      }

      addedImplementations.push(A);

      expect(() => ascend()).to.throw();
    });

    it("when registration of undecorated implementation has been made", () => {
      class A {
        //
      }

      addedImplementations.push(A);
      implementations.push(A);

      expect(() => ascend()).to.throw();
    });
  });

  describe("with options", () => {
    it("disables discovery of decorated implementations", () => {
      const resolver = ascend({ discoverDecoratedImplementations: false });
      const expected = ascend().getRegistrationCount() - implementations.length;

      expect(resolver.getRegistrationCount()).to.equal(expected);
    });

    it("disables discovery of bootstrappers", () => {
      const resolver = ascend({ discoverDecoratedBootstrappers: false });

      expect(resolver.getRegistrationCount()).to.equal(implementations.length);
    });

    it("registers implementations", () => {
      @Service
      class Test {
        //
      }

      const resolver = ascend({
        implementations: [ Test ],
      });

      expect(() => resolver.resolve(Test)).not.to.throw();
    });

    it("registers bootstrappers", () => {
      @Service
      class Test {
        //
      }

      class TestBootstrapper implements IBootstrapper {
        public bootstrap(registrator: Registrator): void {
          registrator.register(Test);
        }
      }

      const resolver = ascend({
        bootstrappers: [
          new TestBootstrapper(),
        ],
      });

      expect(() => resolver.resolve(Test)).not.to.throw();
    });
  });
});
