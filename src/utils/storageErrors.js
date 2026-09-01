export function isMissingBucketError(error) {
  if (!error) return false;

  const message = `${error?.message || ''}`.toLowerCase();
  const code = `${error?.code || ''}`.toLowerCase();

  return code === 'nosuchbucket' || message.includes('bucket not found');
}
