import test from 'node:test';
import assert from 'node:assert/strict';
import { isMissingBucketError } from './storageErrors.js';

test('detects missing bucket errors', () => {
  assert.equal(isMissingBucketError({ code: 'NoSuchBucket' }), true);
  assert.equal(isMissingBucketError({ message: 'Bucket not found' }), true);
  assert.equal(isMissingBucketError({ message: 'Unexpected issue' }), false);
});
