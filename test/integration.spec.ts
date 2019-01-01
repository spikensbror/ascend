/* tslint:disable:max-classes-per-file */

import { expect } from "chai";
import "mocha";

import { ascend } from "./integration/ascender";

import {
  DecoratedExampleService,
  NotRegisteredService,
} from "./integration/shared";

import {
  IBootstrapper,
  Registrator,
  Service,
} from "../src";

import {
  implementations as globalImplementations,
} from "../src/decorators/Service";

describe("integration-test configured ascend resolver", () => {
  it("should be able to resolve the specified service and its dependencies", () => {
    expect(ascend().resolve(DecoratedExampleService).getA()).to.equal("ABD");
  });

  it("should resolve the requested service as a singleton", () => {
    const resolver = ascend();
    const expected = resolver.resolve(DecoratedExampleService);

    expect(resolver.resolve(DecoratedExampleService)).to.equal(expected);
    expect(resolver.resolve(DecoratedExampleService)).to.equal(expected);
  });

  describe("should throw error", () => {
    let addedImplementations: any[] = [];

    afterEach(() => {
      // Remove any added services and clear the array.

      addedImplementations.forEach((i: any) => {
        const index = globalImplementations.indexOf(i);
        if (index < 0) {
          return;
        }

        globalImplementations.splice(index, 1);
      });

      addedImplementations = [];
    });

    it("if trying to resolve unregistered service", () => {
      const resolver = ascend();

      expect(() => resolver.resolve(NotRegisteredService)).to.throw();
    });

    it("if registration with unregistered dependencies has been made", () => {
      class B {
        //
      }

      @Service()
      class A {
        public constructor(test: B) {
          //
        }
      }

      addedImplementations.push(A);

      expect(() => ascend()).to.throw();
    });

    it("if registration of undecorated implementation has been made", () => {
      class A {
        //
      }

      addedImplementations.push(A);
      globalImplementations.push(A);

      expect(() => ascend()).to.throw();
    });
  });

  describe("with options", () => {
    it("should be able to disable discovery of decorated implementations", () => {
      const defaultResolver = ascend();
      const resolver = ascend({ discoverDecoratedImplementations: false });
      const expected = defaultResolver.getDefinitionCount() - globalImplementations.length;

      expect(resolver.getDefinitionCount()).to.equal(expected);
    });

    it("should be able to disable discovery of bootstrappers", () => {
      const resolver = ascend({ discoverDecoratedBootstrappers: false });

      expect(resolver.getDefinitionCount()).to.equal(globalImplementations.length);
    });

    it("should be able add implementations", () => {
      @Service()
      class Test {
        //
      }

      const resolver = ascend({
        implementations: [ Test ],
      });

      expect(() => resolver.resolve(Test)).not.to.throw();
    });

    it("should be able to add bootstrappers", () => {
      @Service()
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
