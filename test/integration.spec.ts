/* tslint:disable:max-classes-per-file */

import { expect } from "chai";
import "mocha";

import ascend from "./integration/ascender";

import {
  DecoratedExampleService,
  NotRegisteredService,
} from "./integration-shared";

import {
  IBootstrapper,
  Injectable,
  Registrator,
} from "../src";

import {
  addService,
  removeService,
  services as globalDecoratedServices,
} from "../src/decorators/Service";

describe("integration-test configured ascend resolver", () => {
  it("should be able to resolve the specified service and its dependencies", () => {
    expect(ascend().resolve(DecoratedExampleService).getA()).to.equal("ABCD");
  });

  it("should resolve the requested service as a singleton", () => {
    const resolver = ascend();
    const expected = resolver.resolve(DecoratedExampleService);

    expect(resolver.resolve(DecoratedExampleService)).to.equal(expected);
    expect(resolver.resolve(DecoratedExampleService)).to.equal(expected);
  });

  describe("should throw error", () => {
    let addedServices: any[] = [];

    afterEach(() => {
      addedServices.forEach((d: any) => removeService(d));
      addedServices = [];
    });

    it("if trying to resolve unregistered service", () => {
      const resolver = ascend();

      expect(() => resolver.resolve(NotRegisteredService)).to.throw();
    });

    it("if registration with unregistered dependencies has been made", () => {
      class B {
        //
      }

      @Injectable
      class A {
        public constructor(test: B) {
          //
        }
      }

      addedServices.push(addService(A, A));

      expect(() => ascend()).to.throw();
    });

    it("if registration of undecorated implementation has been made", () => {
      class A {
        //
      }

      addedServices.push(addService(A, A));

      expect(() => ascend()).to.throw();
    });
  });

  describe("with options", () => {
    it("should be able to disable discovery of decorated services", () => {
      const defaultResolver = ascend();
      const resolver = ascend({ discoverDecoratedServices: false });
      const expected = defaultResolver.getDefinitionCount() - globalDecoratedServices.length;

      expect(resolver.getDefinitionCount()).to.equal(expected);
    });

    it("should be able to disable discovery of bootstrappers", () => {
      const resolver = ascend({ discoverDecoratedBootstrappers: false });

      expect(resolver.getDefinitionCount()).to.equal(globalDecoratedServices.length);
    });

    it("should be able add services", () => {
      @Injectable
      class Test {
        //
      }

      const resolver = ascend({
        services: [
          { service: Test, implementation: Test },
        ],
      });

      expect(() => resolver.resolve(Test)).not.to.throw();
    });

    it("should be able to add bootstrappers", () => {
      @Injectable
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
