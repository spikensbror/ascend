/* tslint:disable:max-classes-per-file */

import { expect } from "chai";
import "mocha";

import {
  ascend,
  DecoratedExampleServiceImpl,
  MultiDecoratedDependencyService,
  MultiDecoratedDependencyServiceImpl1,
  MultiDecoratedDependencyServiceImpl2,
  SimpleDecoratedDependencyService
} from "./integration/ascender";

import {
  BootstrappedDependencyService,
  DecoratedDependencyService,
  DecoratedExampleService,
  NotRegisteredService
} from "./integration/shared";

import { IBootstrapper, Registrator, Resolver, Service } from "../src";

import { implementations } from "../src/decorators/Implements";

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

    expect(impl.decorated).to.equal(
      resolver.resolve(DecoratedDependencyService)
    );

    expect(impl.simple).to.equal(
      resolver.resolve(SimpleDecoratedDependencyService)
    );

    // Verify @all inject.

    const multipleTypes: Function[] = [];
    impl.multiple.forEach((m: MultiDecoratedDependencyService) => {
      multipleTypes.push(m.constructor);
    });

    expect(multipleTypes).to.include(MultiDecoratedDependencyServiceImpl1);
    expect(multipleTypes).to.include(MultiDecoratedDependencyServiceImpl2);
  });

  it("resolves itself", () => {
    const resolver = ascend();

    expect(resolver.resolve(Resolver)).to.equal(resolver);
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

      expect(() => resolver.resolve(DecoratedExampleService)).to.throw();
    });

    it("disables discovery of bootstrappers", () => {
      const resolver = ascend({ discoverDecoratedBootstrappers: false });

      expect(() => resolver.resolve(BootstrappedDependencyService)).to.throw();
    });

    it("registers implementations", () => {
      @Service
      class Test {
        //
      }

      const resolver = ascend({
        implementations: [Test]
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
        bootstrappers: [new TestBootstrapper()]
      });

      expect(() => resolver.resolve(Test)).not.to.throw();
    });
  });
});
