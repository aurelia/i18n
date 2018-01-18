import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';

import { bootstrapTestEnvironment } from './staging-helpers';

describe('t-attribute', () => {
  it('should convert bound integers to strings', done => {
    const target = 'test-target';
    const component = StageComponent
      .withResources('test/unit/mocks/rt-vm')
      .inView(`<div t.bind="integer" id=${target}></div>`)
      .boundTo({ integer: 1 });

    bootstrapTestEnvironment(component);

    component.create(bootstrap)
      .then(() => {
        const elem = document.getElementById(target);
        expect(elem.innerHTML).toBe('1');

        done();
      });
  });
});
