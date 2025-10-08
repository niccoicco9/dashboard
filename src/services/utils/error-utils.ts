export type NormalizedErrorType = 'network' | 'timeout' | 'server' | 'unknown';

export function deriveErrorType(message: string): NormalizedErrorType {
  const lowered = (message || '').toLowerCase();
  if (lowered.includes('network')) return 'network';
  if (lowered.includes('timeout')) return 'timeout';
  if (lowered.includes('server')) return 'server';
  return 'unknown';
}


