export function isImmutableAsset(remotePath: string): boolean;

export function shouldSkipUpload(remotePath: string, previousManifest: string[]): boolean;

export function describeFailure(
  label: string,
  response: { status: number; body?: { toString(): string } },
): string;
