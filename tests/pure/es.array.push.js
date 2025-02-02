import { DESCRIPTORS, STRICT } from '../helpers/constants';

import push from 'core-js-pure/es/array/virtual/push';
import defineProperty from 'core-js-pure/es/object/define-property';

QUnit.test('Array#push', assert => {
  assert.isFunction(push);

  const object = { length: 0x100000000 };
  assert.same(push.call(object, 1), 0x100000001, 'proper ToLength #1');
  assert.same(object[0x100000000], 1, 'proper ToLength #2');

  if (STRICT) {
    if (DESCRIPTORS) {
      assert.throws(() => push.call(defineProperty([], 'length', { writable: false }), 1), TypeError, 'now-writable length, with arg');
      assert.throws(() => push.call(defineProperty([], 'length', { writable: false })), TypeError, 'now-writable length, without arg');
    }

    assert.throws(() => push.call(null), TypeError);
    assert.throws(() => push.call(undefined), TypeError);
  }
});
